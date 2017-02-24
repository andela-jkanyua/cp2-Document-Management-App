module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        unique: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Documents, {
          foreignKey: 'userId',
        });
        Users.belongsTo(models.Role, {
          foreignKey: 'roleId',
        });
      },
    },
  });
  return Users;
};
