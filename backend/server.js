import express from 'express';
import GraphHTTP from 'express-graphql';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import Sequelize from 'sequelize';
import initModels from './src/models/index';
import initRepos from './src/repos/index';
import initServices from './src/services/index';
import config from './config/config';
import initGraphqlSchema from './src/graphql/index';

const initDb = async (sequelizeConfig) => {
  const sequelize = new Sequelize(sequelizeConfig);
  const db = await initModels(sequelize);
  sequelize.sync();
  return db;
};

const configureApp = (app) => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
};

export default async function createServer() {
  const app = express();

  const db = await initDb(config[process.env.NODE_ENV]);
  const repos = await initRepos(db);
  const services = initServices(repos);
  const graphqlSchema = initGraphqlSchema(services);

  configureApp(app);

  app.use(
    '/graphql',
    GraphHTTP(request => ({
      schema: graphqlSchema,
      context: { user: request.user },
      pretty: true,
      graphiql: process.env.NODE_ENV === 'development',
    })),
  );

  return app;
}
