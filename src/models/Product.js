const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    ProductID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Expiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Product;
};
