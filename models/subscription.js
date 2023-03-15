'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.Plans, {
        foreignKey: "plan_id"
      });

      Subscription.belongsTo(models.Discount, {
        foreignKey: "discount_id"
      });

      Subscription.hasMany(models.Subscription_Usage_Details, {
        foreignKey: "subscription_id"
      })
    }
  }
  Subscription.init({
    plan_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Plans',
        key: 'id'
      }
    },
    customer_email: DataTypes.STRING(100),
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    next_renewal_date: DataTypes.DATE,
    auto_renew: DataTypes.BOOLEAN,
    discount_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Discount',
        key: 'id'
      }
    },
    status: DataTypes.BOOLEAN,
    charges: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Subscription',
    freezeTableName: true,
  });
  return Subscription;
};