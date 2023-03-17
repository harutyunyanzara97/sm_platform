'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Activation_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Activation_History.belongsTo(models.Products, {
        foreignKey: "product_id"
      });
    }
  }
  Product_Activation_History.init({
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    timestamp: DataTypes.DATE,
    action_performed: DataTypes.STRING(50),
    update_description: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Product_Activation_History',
    freezeTableName: true
  });
  return Product_Activation_History;
};