const boom = require("@hapi/boom");

const { models } = require("./../libs/sequelize");

class ProductsService {
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ["category"],
    };

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

    if (!product) {
      throw boom.notFound("Product no found");
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    await product.update(changes);
    return { id };
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
