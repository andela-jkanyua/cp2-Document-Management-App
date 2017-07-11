module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Documents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
    content: {
      type: Sequelize.TEXT,
    },
    access: {
      type: Sequelize.ENUM,
      values: ['public', 'private'],
      defaultValue: 'private',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Documents'),
};
