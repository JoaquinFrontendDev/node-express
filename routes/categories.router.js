const express = require('express');
const CategoriesService = require('.././services/categories.service');
const validationHandler = require('../middlewares/validationHandler');
const {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
} = require('../schemas/categories.schema');
const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categorys = await service.find();
  res.json(categorys);
});

router.get(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await service.delete(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
