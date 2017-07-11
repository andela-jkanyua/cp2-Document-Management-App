module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: DataTypes.TEXT,
    access: {
      type: DataTypes.ENUM,
      values: ['public', 'private'],
      defaultValue: 'private',
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
