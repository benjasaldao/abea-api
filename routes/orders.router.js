const express = require("express");
const passport = require("passport");

const OrderService = require("../services/order.service");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const validationHandler = require("../middlewares/validationHandler");
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
  updateOrderItemSchema
} = require("../schemas/order.schema");

const router = express.Router();
const service = new OrderService();

router.get(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  async (req, res, next) => {
    try {
      const order = await service.find();
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      delete order.dataValues.user.dataValues.password;
      delete order.dataValues.user.dataValues.recoveryToken;
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-item",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/remove-item",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const {id} = req.body;
      const removedItemId = await service.removeItem(id);
      res.json(removedItemId);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/items/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const items = await service.findOrderItems(id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/items/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getOrderSchema, "params"),
  validationHandler(updateOrderItemSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const {body} = req;
      const response = await service.updateOrderItem(id, body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin", "customer"),
  validationHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
