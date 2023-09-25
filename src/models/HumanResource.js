const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const HumanResource = sequelize.define("HumanResource", {
    HumanResourceID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    TotalWorkers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ContractedStaff: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CasualWorkers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return HumanResource;
};
