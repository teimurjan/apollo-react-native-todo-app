import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'todo',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: todo => todo.id,
    },
    title: {
      type: GraphQLString,
      resolve: todo => todo.title,
    },
  }),
});
