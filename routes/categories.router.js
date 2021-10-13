const express = require('express');
const faker = require('faker');
const router = express.Router();
const categories = [];

router.get('/', (req, res) => {
  for (let i = 0; i < 10; i++) {
    categories.push({
      categorie: faker.commerce.productAdjective,
    });
  }
  res.send(categories);
});

router.get('/:categorieId', (req, res) => {
  const { categorieId } = req.params;
  res.json({
    categorieId,
    categorie: categories[0],
  });
});

router.get('/:categorieId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;
  res.json({
    categorieId,
    productId,
    name: 'Product 2',
    price: 300,
  });
});

module.exports = router;
