'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.Products, {
        foreignKey: "product_id"
      });

      Users.hasMany(models.User_Update_History, {
        foreignKey: "user_id"
      });
    }
  }
  Users.init({
    email: DataTypes.STRING(200),
    product_id: {
      type: DataTypes.UUID,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    type: DataTypes.STRING(30),
    deactivated: DataTypes.DATE,
    deactivation_reason: DataTypes.STRING(200),
    active_flag: DataTypes.BOOLEAN,
    password: DataTypes.STRING(100),
    apiKey: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Users',
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      }
    }
  });
  return Users;
};