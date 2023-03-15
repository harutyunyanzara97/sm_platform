'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan_Features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Plan_Features.belongsTo(models.Plans, {
        foreignKey: "plan_id"
      })
    }
  }
  Plan_Features.init({
    plan_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Plans',
        key: 'id'
      }
    },
    param_name: DataTypes.STRING(100),
    param_type: DataTypes.STRING(200),
    param_description: DataTypes.STRING(200),
    param_limit: DataTypes.DECIMAL(10),
    param_alert_level: DataTypes.INTEGER,
    param_flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Plan_Features',
  });
  return Plan_Features;
};