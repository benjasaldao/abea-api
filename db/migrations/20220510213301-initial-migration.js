"use strict";
const bcrypt = require('bcrypt')

const { UserSchema, USER_TABLE } = require("../models/user.model");
const { ProductSchema, PRODUCT_TABLE } = require("../models/product.model");
const { CategorySchema, CATEGORY_TABLE } = require("../models/category.model");
const { OrderSchema, ORDER_TABLE } = require("../models/order.model");
const {
  OrderProductSchema,
  ORDER_PRODUCT_TABLE,
} = require("../models/order-product.model");


module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  
    const hash = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        username: 'admin',
        email: 'saldaobenjamin@gmail.com',
        password: hash,
        phone: 1234567890,
        role: 'admin',
        create_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);

    await queryInterface.dropTable(USER_TABLE);
  },
};
