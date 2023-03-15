'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.hasMany(models.Subscription, {
        foreignKey: "discount_id"
      });

      Discount.belongsTo(models.Plans, {
        foreignKey: "plan_id"
      })
    }
  }
  Discount.init({
    plan_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Plans',
        key: 'id'
      }
    },
    period_start_date: DataTypes.DATE,
    code: DataTypes.CHAR,
    percentage: DataTypes.DECIMAL(3),
    value: DataTypes.INTEGER,
    period: DataTypes.CHAR(1),
    number_of_periods: DataTypes.DECIMAL(4),
    active_flag: DataTypes.BOOLEAN,
    description: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Discount',
    freezeTableName: true,
  });
  return Discount;
};