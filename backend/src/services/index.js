import { makeReadTodosService, makeCreateTodoService, makeDeleteTodoService } from './todo';

export default repos => ({
  readTodosService: makeReadTodosService(repos.todoRepo),
  createTodoService: makeCreateTodoService(repos.todoRepo),
  deleteTodoService: makeDeleteTodoService(repos.todoRepo),
});
