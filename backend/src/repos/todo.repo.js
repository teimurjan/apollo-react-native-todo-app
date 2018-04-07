export default db => ({
  findById: id => db.todo.findById(id),
  getAll: () => db.todo.findAll(),
  create: title => db.todo.create({ title }),
});
