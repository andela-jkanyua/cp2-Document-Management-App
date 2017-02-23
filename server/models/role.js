module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.Users, {
          foreignKey: 'roleId',
        });
      },
    },
  });
  return Role;
};
