export const makeReadTodosService = todoRepo => ({
  handle: () => todoRepo.getAll(),
});

export const makeCreateTodoService = todoRepo => ({
  handle: data => todoRepo.create(data),
});

export const makeDeleteTodoService = todoRepo => ({
  handle: id => todoRepo.delete(id),
});
