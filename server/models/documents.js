module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          allowNull: false,

        });
      },
    },
  });
  return Documents;
};
