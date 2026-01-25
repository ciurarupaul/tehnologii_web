export default (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};
