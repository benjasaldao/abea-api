const Joi = require("joi");

const id = Joi.number().integer();
const userId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const colorId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  userId: userId.required(),
});

const updateOrderItemSchema = Joi.object({
  amount: amount,
  colorId: colorId,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  colorId: colorId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
  updateOrderItemSchema,
};
