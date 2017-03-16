module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.bulkInsert('Users',
      [{
        email: 'johndoe@example.com',
        password: 'password',
        username: 'JohnD',
        firstName: 'John',
        lastName: 'Doe',
        roleId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'janedoe@example.com',
        password: 'password',
        username: 'JaneD',
        firstName: 'Jane',
        lastName: 'Doe',
        roleId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'ericmarshal@example.com',
        password: 'eric123',
        username: 'EricM',
        firstName: 'Eric',
        lastName: 'Marsal',
        roleId: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'jakechudnow@music.com',
        password: 'jake123',
        username: 'JakeC',
        firstName: 'Jake',
        lastName: 'Chudnow',
        roleId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'werner.heisenberg@chem.com',
        password: 'saymyname',
        username: 'WalterW',
        firstName: 'Werner',
        lastName: 'Heisenberg',
        roleId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
