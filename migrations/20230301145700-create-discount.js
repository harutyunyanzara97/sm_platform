'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discount', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      period_start_date: {
        type: Sequelize.DATE
      },
      code: {
        type: Sequelize.CHAR(10)
      },
      percentage: {
        type: Sequelize.DECIMAL(3)
      },
      value: {
        type: Sequelize.INTEGER
      },
      period: {
        type: Sequelize.CHAR(1)
      },
      number_of_periods: {
        type: Sequelize.DECIMAL(4)
      },
      active_flag: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING(200)
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
    await queryInterface.dropTable('Discount');
  }
};