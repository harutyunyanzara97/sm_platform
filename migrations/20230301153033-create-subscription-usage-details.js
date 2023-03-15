'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscription_Usage_Details', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      param_name: {
        type: Sequelize.DECIMAL(10)
      },
      param_limit: {
        type: Sequelize.DECIMAL(10)
      },
      param_usage: {
        type: Sequelize.DECIMAL(10)
      },
      alert_level_reached: {
        type: Sequelize.BOOLEAN
      },
      subscription_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Subscription',
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Subscription_Usage_Details');
  }
};