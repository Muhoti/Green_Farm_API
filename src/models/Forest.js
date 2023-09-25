const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Forest = sequelize.define("Forest", {
    ForestID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    ForestType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ForestSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ForestLife: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TreeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Forest;
};
