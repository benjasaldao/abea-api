const express = require("express");

const ProductsService = require("../services/product.service");
const validationHandler = require("../middlewares/validationHandler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();
const service = new ProductsService();

router.get(
  "/",
  validationHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  validationHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  validationHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  validationHandler(getProductSchema, "params"),
  validationHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validationHandler(getProductSchema, "params"), async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(201).json({id});
    } catch (err) {
        next(err);
    }
});

module.exports = router;