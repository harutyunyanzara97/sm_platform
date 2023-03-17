'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_Pricing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan_Pricing.belongsTo(models.Plans, {
        foreignKey: "plan_id"
      })
    }
  }
  Plan_Pricing.init({
    plan_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Plans',
        key: 'id'
      }
    },
    currency: DataTypes.INTEGER,
    monthly_price: DataTypes.INTEGER,
    yearly_price: DataTypes.INTEGER,
    pricing_start: DataTypes.DATE,
    pricing_end: DataTypes.DATE,
    frequency: DataTypes.CHAR(2),
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Plan_Pricing',
    freezeTableName: true,
  });
  return Plan_Pricing;
};