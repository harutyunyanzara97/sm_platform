'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Plan_Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Plan_Mapping.init({
    product_id: DataTypes.CHAR(10),
    plan_id: DataTypes.CHAR(10),
    date_started: DataTypes.DATE,
    date_end: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product_Plan_Mapping',
  });
  return Product_Plan_Mapping;
};