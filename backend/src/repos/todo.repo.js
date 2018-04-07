export default db => ({
  findById: id => db.todo.findById(id),
  getAll: () => db.todo.findAll(),
  create: title => db.todo.create({ title }),
  delete: async (id) => {
    const todo = await db.todo.findById(id);
    return todo.destroy();
  },
});
