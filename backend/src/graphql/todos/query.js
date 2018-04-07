import { GraphQLList } from 'graphql';
import TodoType from './type';

export default todoRepo => ({
  type: new GraphQLList(TodoType),
  description: 'List of Todos',
  args: {},
  resolve: () => todoRepo.getAll(),
});
