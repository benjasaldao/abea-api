const express = require("express");

const CategoriesService = require("../services/category.service");
const validationHandler = require("../middlewares/validationHandler");
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require("../schemas/category.schema");

const router = express.Router();
const service = new CategoriesService();

router.get("/", async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  validationHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  validationHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const category = await service.create(body);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  validationHandler(getCategorySchema, "params"),
  validationHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const category = await service.update(id, body);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  validationHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
