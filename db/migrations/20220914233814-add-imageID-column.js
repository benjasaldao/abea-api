'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn("products", "image_id", {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: "image_id",
      onDelete: "SET NULL",
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn("products", "image_id");
  }
};
