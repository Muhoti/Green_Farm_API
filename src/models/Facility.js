const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define("Facility", {
    FacilityID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    FacilityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Facility;
};
