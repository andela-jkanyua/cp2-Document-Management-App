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
    },
    content: {
      type: Sequelize.TEXT,
    },
    dateCreated: {
      type: Sequelize.DATE,
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
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Documents'),
};
