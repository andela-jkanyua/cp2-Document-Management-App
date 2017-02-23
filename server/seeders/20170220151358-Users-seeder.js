module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users',
      [{
        email: 'johndoe@example.com',
        password: 'password',
        firstName: 'John',
        lastName: 'Doe',
        roleId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'janedoe@example.com',
        password: 'password',
        firstName: 'Jane',
        lastName: 'Doe',
        roleId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'ericmarshal@example.com',
        password: 'eric123',
        firstName: 'Eric',
        lastName: 'Marsal',
        roleId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'jakechudnow@music.com',
        password: 'jake123',
        firstName: 'Jake',
        lastName: 'Chudnow',
        roleId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, {
        email: 'werner.heisenberg@chem.com',
        password: 'saymyname',
        firstName: 'Werner',
        lastName: 'Heisenberg',
        roleId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ], {});
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
  },
};
