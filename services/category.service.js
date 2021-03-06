const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class CategoryService {

  async create(data) {
    const newUser = await models.Category.create(data);
    return newUser;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });

    if(!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id)
    await category.update(changes);
    return { id }
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryService;