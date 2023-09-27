const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const MarketRecord = sequelize.define("MarketRecord", {
    MarketRecordID: {
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
    Quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SellingPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Buyer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return MarketRecord;
};
