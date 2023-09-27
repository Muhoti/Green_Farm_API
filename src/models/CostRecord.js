const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const CostRecord = sequelize.define("CostRecord", {
    CostRecordID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CostType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaidTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return CostRecord;
};
