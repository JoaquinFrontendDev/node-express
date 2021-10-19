const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const CustomerService = require('.././services/customer.service');
const router = express.Router();
const service = new CustomerService();
const {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
} = require('./../schemas/customer.schema');

/***************** GET **********************/

router.get('/', async (req, res) => {
  const customers = await service.find();
  res.json(customers);
});

router.get(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

/***************** POST **********************/

router.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

/***************** PATCH **********************/

router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await service.update(id, body);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);

/***************** DELETE **********************/

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await service.delete(id);
    res.status(200).json(deletedCustomer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
