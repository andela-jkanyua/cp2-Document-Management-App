'use strict';
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Role.hasMany(models.Users, {
          foreignKey: 'roleId'
        });
      }
    }
  });
  return Role;
};