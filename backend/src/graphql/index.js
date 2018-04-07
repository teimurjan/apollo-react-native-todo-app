import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import initTodosQuery from './todos/query';
import initTodosMutation from './todos/mutations';

const initQueries = repos => ({
  todos: initTodosQuery(repos.todoRepo),
});

const initMutations = repos => initTodosMutation(repos.todoRepo);

export default (repos) => {
  const query = new GraphQLObjectType({
    name: 'Query',
    fields: initQueries(repos),
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: initMutations(repos),
  });

  return new GraphQLSchema({
    query,
    mutation,
  });
};
