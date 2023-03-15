'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plan_Features', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      param_name: {
        type: Sequelize.STRING(100)
      },
      param_type: {
        type: Sequelize.STRING(100)
      },
      param_description: {
        type: Sequelize.STRING(200)
      },
      param_limit: {
        type: Sequelize.DECIMAL(10)
      },
      param_alert_level: {
        type: Sequelize.INTEGER
      },
      param_flag: {
        type: Sequelize.BOOLEAN
      },
      plan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Plans',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plan_Features');
  }
};