'use strict';
const { ORDER_PRODUCT_TABLE } = require('../models/order-product.model')
const { PRODUCT_COLORS_TABLE } = require('../models/product-colors.model')
const { DataTypes } = require('sequelize');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(ORDER_PRODUCT_TABLE, 'color_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: PRODUCT_COLORS_TABLE,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(ORDER_PRODUCT_TABLE, 'colorId');
  }
};
