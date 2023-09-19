const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ColorService {

  async create(data) {
    const newColor = await models.ProductColors.create(data);
    return newColor;
  }

  async find() {
    const colors = await models.ProductColors.findAll();
    return colors;
  }

  async findOne(id) {
    const color = await models.ProductColors.findByPk(id);

    if(!color) {
      throw boom.notFound('Color not found');
    }

    return color;
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

module.exports = ColorService;