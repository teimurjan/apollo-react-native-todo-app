import express from 'express';
import GraphHTTP from 'express-graphql';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import Sequelize from 'sequelize';
import initModels from './src/models/index';
import initRepos from './src/repos/index';
import config from './config/config';
import initGraphqlSchema from './src/graphql/index';

export default async function createServer() {
  const app = express();
  app.use(logger('dev'));

  const sequelize = new Sequelize(config[process.env.NODE_ENV]);
  const db = await initModels(sequelize);
  sequelize.sync();
  const repos = await initRepos(db);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(
    '/graphql',
    GraphHTTP(request => ({
      schema: initGraphqlSchema(repos),
      context: { user: request.user },
      pretty: true,
      graphiql: process.env.NODE_ENV === 'development',
    })),
  );

  return app;
}
