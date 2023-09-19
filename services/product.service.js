const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");
const cloudinary = require("cloudinary").v2;
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProductsService {
  async create(req) {
    const { body, file } = req;

    const result = await cloudinary.uploader.upload(file.path);

    const product = {
      name: body.name,
      description: body.description,
      categoryId: body.categoryId,
      image: result.secure_url,
      imageId: result.public_id,
    };

    const newProduct = await models.Product.create(product);

    await fs.unlink(file.path);

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
    const product = await models.Product.findByPk(id, {
      include: "colors",
    });

    if (!product) {
      throw boom.notFound("Product no found");
    }

    return product;
  }

  async update(id, req) {
    const { body, file } = req;
    const product = await this.findOne(id);
    if (file) {
      await cloudinary.uploader.destroy(product.imageId);

      const result = await cloudinary.uploader.upload(file.path);
      await fs.unlink(file.path);

      const changes = {
        ...body,
        image: result.secure_url,
        imageId: result.public_id,
      };
      await product.update(changes);
      return { id };
    } else {
      await product.update(body);
      return { id };
    }
  }

  async delete(id) {
    const product = await this.findOne(id);
    await cloudinary.uploader.destroy(product.imageId);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
