'use strict';

const { PRODUCT_COLORS_TABLE, productColorsSchema } = require('../models/product-colors')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRODUCT_COLORS_TABLE , productColorsSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_COLORS_TABLE);
  }
};
