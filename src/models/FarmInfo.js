const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const FarmInfo = sequelize.define("FarmInfo", {
    FarmInfoID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    County: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SubCounty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Village: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductionSystem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    LandSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Latitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FarmInfo;
};
