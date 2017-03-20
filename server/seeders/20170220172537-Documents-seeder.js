module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Documents',
      [{
        title: 'Helpful Spouse',
        content: 'A man and his wife are having a huge argument when their car is stopped by a...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1,
        access: 'public',
      }, {
        title: 'Top joke in Australia',
        content: 'This woman rushed to see her doctor, looking very much worried and all .... ',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 2,
        access: 'private',
      }, {
        title: 'Lorem ipsum dolor sit amet',
        content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula ....',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 3,
        access: 'public',
      }, {
        title: 'Li Europan lingues es membres ',
        content: 'At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun ...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 4,
        access: 'private',
      }, {
        title: 'Li Europan lingues es membres ',
        content: 'At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles....',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 5,
        access: 'public',
      },
      ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Documents', null, {});
  },
};
