'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.hasMany(models.Users, {
        foreignKey: "product_id"
      });

      Products.hasMany(models.Product_Activation_History, {
        foreignKey: "product_id"
      });

      Products.hasMany(models.Plans, {
        foreignKey: "product_id"
      });
    }
  }
  Products.init({
    name: DataTypes.STRING(200),
    description: DataTypes.STRING(500),
    active_flag: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};