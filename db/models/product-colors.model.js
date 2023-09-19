const { Model, DataTypes, Sequelize } = require("sequelize");
const { PRODUCT_TABLE } = require("./product.model");

const PRODUCT_COLORS_TABLE = "product_colors";

const ProductColorsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class ProductColors extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_COLORS_TABLE,
      modelName: "ProductColors",
      timestamps: false,
    };
  }
}

module.exports = { ProductColors, ProductColorsSchema, PRODUCT_COLORS_TABLE };
