const express = require('express');
const CategoriesService = require('.././services/categories.service');
const validationHandler = require('../middlewares/validationHandler');
const {
  getCategorieSchema,
  createCategorieSchema,
  updateCategorieSchema,
} = require('../schemas/categories.schema');
const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get(
  '/:id',
  validationHandler(getCategorieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categorie = await service.findOne(id);
      res.json(categorie);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createCategorieSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const newCategorie = await service.create(body);
    res.status(201).json(newCategorie);
  }
);

router.patch(
  '/:id',
  validationHandler(getCategorieSchema, 'params'),
  validationHandler(updateCategorieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const categorie = await service.update(id, body);
      res.status(200).json(categorie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategorie = await service.delete(id);
    res.status(200).json(deletedCategorie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
