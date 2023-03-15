'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING(200)
      },
      type: {
        type: Sequelize.STRING(30)
      },
      deactivated: {
        type: Sequelize.DATE
      },
      deactivation_reason: {
        type: Sequelize.STRING(20)
      },
      active_flag: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING(100)
      },
      apiKey: {
        type: Sequelize.STRING(100)
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};