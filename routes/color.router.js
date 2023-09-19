const express = require("express");
const passport = require("passport");

const ColorService = require("../services/color.service");
const validatorHandler = require("../middlewares/validationHandler");
const { checkRoles, checkApiKey } = require("../middlewares/authHandler");
const {
  createColorSchema,
  updateColorSchema,
  getColorSchema,
} = require("../schemas/color.schema");

const router = express.Router();
const service = new ColorService();

router.get(
  "/",
  checkApiKey,
  async (req, res, next) => {
    try {
      const colors = await service.find();
      res.json(colors);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  checkApiKey,
  validatorHandler(getColorSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const color = await service.findOne(id);
      res.json(color);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(createColorSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newColor = await service.create(body);
      res.status(201).json(newColor);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getColorSchema, "params"),
  validatorHandler(updateColorSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const changes = req.body;
      const updatedColor = await service.update(id, changes);
      res.json(updatedColor);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  checkApiKey,
  passport.authenticate("jwt", { session: false }),
  checkRoles("admin"),
  validatorHandler(getColorSchema, "params"),
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
