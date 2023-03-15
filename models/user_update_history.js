'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Update_History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Update_History.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  User_Update_History.init({
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    timestamp: DataTypes.DATE,
    action_performed: DataTypes.STRING(50),
    update_note: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'User_Update_History',
  });
  return User_Update_History;
};