'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plans.belongsTo(models.Products, {
        foreignKey: "product_id"
      });

      Plans.hasMany(models.Plan_Features, {
        foreignKey: "plan_id"
      });

      Plans.hasMany(models.Plan_Pricing, {
        foreignKey: "plan_id"
      });

      Plans.hasMany(models.Discount, {
        foreignKey: "plan_id"
      });

      Plans.hasMany(models.Subscription, {
        foreignKey: "plan_id"
      })
    }
  }
  Plans.init({
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(300)
  }, {
    sequelize,
    modelName: 'Plans',
  });
  return Plans;
};