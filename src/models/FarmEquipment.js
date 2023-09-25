const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const FarmEquipment = sequelize.define("FarmEquipment", {
    EquipmentID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    EquipmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EquipmentNameOrID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfAcquisition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Cost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EnergyUsed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FarmEquipment;
};
