const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const FarmInventory = sequelize.define("FarmInventory", {
    InventoryID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    AnimalType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UnitNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SireCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DamCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return FarmInventory;
};
