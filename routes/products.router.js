const express = require('express');
const ProductsService = require('./../services/product.service');
const router = express.Router();
const service = new ProductsService();

/***************** GET **********************/

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(302).json(product);
  } catch (error) {
    next(error);
  }
});

/***************** POST **********************/

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

/***************** PATCH **********************/

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

/***************** DELETE **********************/

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.delete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
