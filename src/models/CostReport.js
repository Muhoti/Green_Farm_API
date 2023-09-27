const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const CostReport = sequelize.define("CostReport", {
    CostReportID: {
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
  return CostReport;
};
