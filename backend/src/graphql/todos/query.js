import { GraphQLList } from 'graphql';
import TodoType from './type';

export default service => ({
  type: new GraphQLList(TodoType),
  description: 'List of Todos',
  args: {},
  resolve: () => service.handle(),
});
