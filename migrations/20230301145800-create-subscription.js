'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscription', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      customer_email: {
        type: Sequelize.STRING(100)
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE
      },
      next_renewal_date: {
        type: Sequelize.DATE
      },
      auto_renew: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      charges: {
        type: Sequelize.INTEGER
      },
      plan_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Plans',
          key: 'id'
        }
      },
      discount_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Discount',
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
    await queryInterface.dropTable('Subscription');
  }
};