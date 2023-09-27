const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const ProductionRecord = sequelize.define("ProductionRecord", {
    ProductionRecordID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AnimalID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return ProductionRecord;
};
