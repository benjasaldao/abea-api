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

  async removeItem(id) {
    const itemToRemove = await models.OrderProduct.findByPk(id);
    if (itemToRemove) {
      await itemToRemove.destroy();
      return { id };
    }
    throw boom.notFound("Order not found");
  }

  async findOrderItems(orderId) {
    const items = await models.OrderProduct.findAll({
      where: {
        $order_id$: orderId,
      },
      include: ["product", "color"],
    });
    return items;
  }

  async updateOrderItem(itemId, changes) {
    const response = models.OrderProduct.update(changes, {
      where: {
        id: itemId
      }
    });
    return response;
  }

  async find() {
    const orders = await models.Order.findAll({
      include: [{ association: "user" }],
    });
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

    if (!order) {
      throw boom.notFound("Order not found");
    }

    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$user.id$": userId,
      },
    });
    return orders;
  }

  async delete(id) {
    const order = await this.findOne(id);
    if (order) {
      await models.OrderProduct.destroy({
        where: {
          order_id: id,
        },
      });
      await order.destroy();
      return { id };
    }
    throw boom.notFound("Order not found");
  }
}

module.exports = OrderService;
