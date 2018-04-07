import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import TodoType from './type';

export const makeCreateTodoMutation = service => ({
  type: TodoType,
  args: {
    todo: {
      type: new GraphQLInputObjectType({
        name: 'TodoCreateInput',
        fields: {
          title: { type: GraphQLString },
        },
      }),
    },
  },
  resolve: (source, args) => service.handle(args.todo.title),
});

export const makeDeleteTodoMutation = service => ({
  type: TodoType,
  args: {
    id: { type: GraphQLString },
  },
  resolve: (source, args) => service.handle(args.id),
});
