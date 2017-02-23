'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      title: 'admin',
      description: 'Administrator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      title: 'User',
      description: 'Not an admin user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
