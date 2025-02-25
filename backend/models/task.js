export default (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {});
    return Task;
  };
  