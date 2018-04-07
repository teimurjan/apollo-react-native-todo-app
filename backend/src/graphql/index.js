import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import initTodosQuery from './todos/query';
import { makeCreateTodoMutation, makeDeleteTodoMutation } from './todos/mutations';

const initQueries = services => ({
  todos: initTodosQuery(services.readTodosService),
});

const initMutations = services => ({
  createTodo: makeCreateTodoMutation(services.createTodoService),
  deleteTodo: makeDeleteTodoMutation(services.deleteTodoService),
});

export default (services) => {
  const query = new GraphQLObjectType({
    name: 'Query',
    fields: initQueries(services),
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: initMutations(services),
  });

  return new GraphQLSchema({
    query,
    mutation,
  });
};
