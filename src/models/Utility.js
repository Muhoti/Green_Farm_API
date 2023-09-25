const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define("Utility", {
    UtilityID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    UtilityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MainSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Distance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoadType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Utility;
};
