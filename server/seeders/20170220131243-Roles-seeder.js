module.exports = {
  up: (queryInterface, Sequelize) => {
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

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Roles', null, {});
  },
};
