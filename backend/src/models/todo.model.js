export default (sequelize, DataTypes) =>
  sequelize.define('todo', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, allowNull: false },
  });
