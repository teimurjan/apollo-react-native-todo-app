import { GraphQLInputObjectType, GraphQLString } from 'graphql';
import TodoType from './type';

export default todoRepo => ({
  createTodo: {
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
    resolve: (source, args) => todoRepo.create(args.todo.title),
  },
});
