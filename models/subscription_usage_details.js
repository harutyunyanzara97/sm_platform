'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription_Usage_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription_Usage_Details.belongsTo(models.Subscription, {
        foreignKey: "subscription_id"
      })
    }
  }
  Subscription_Usage_Details.init({
    subscription_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Subscription',
        key: 'id'
      }
    },
    param_name: DataTypes.DECIMAL(10),
    param_limit: DataTypes.DECIMAL(10),
    param_usage: DataTypes.DECIMAL(10),
    alert_level_reached: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Subscription_Usage_Details',
  });
  return Subscription_Usage_Details;
};