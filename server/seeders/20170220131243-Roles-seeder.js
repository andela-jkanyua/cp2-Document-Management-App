module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Roles', [{
      title: 'admin',
      description: 'Administrator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isAdmin: true,
    },
    {
      title: 'User',
      description: 'Not an admin user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isAdmin: false,
    },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Roles', null, {});
  },
};
