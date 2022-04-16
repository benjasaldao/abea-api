const boom = require("@hapi/boom");
const { models } = require("./../libs/sequelize");
class OrderService {
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: "user",
        },
        "items",
      ],
    });

    if(!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    await order.update(changes);
    return { id };
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderService;
