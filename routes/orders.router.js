const express = require("express");
const passport = require("passport");

const OrderService = require("../services/order.service");
const { checkRoles, checkApiKey } = require("./../middlewares/authHandler");
const validationHandler = require("../middlewares/validationHandler");
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require("../schemas/order.schema");

const router = express.Router();
const service = new OrderService();

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
