'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plan_Pricing', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      currency: {
        type: Sequelize.INTEGER
      },
      monthly_price: {
        type: Sequelize.INTEGER
      },
      yearly_price: {
        type: Sequelize.INTEGER
      },
      pricing_start: {
        type: Sequelize.DATE
      },
      pricing_end: {
        type: Sequelize.DATE
      },
      frequency: {
        type: Sequelize.CHAR(2)
      },
      active: {
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
    await queryInterface.dropTable('Plan_Pricing');
  }
};