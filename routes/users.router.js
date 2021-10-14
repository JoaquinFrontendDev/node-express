const express = require('express');
const validationHandler = require('../middlewares/validationHandler');
const UsersService = require('.././services/users.service');
const router = express.Router();
const service = new UsersService();
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('./../schemas/users.schema');

/***************** GET **********************/

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

/***************** POST **********************/

router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  }
);

/***************** PATCH **********************/

router.patch(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

/***************** DELETE **********************/

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await service.delete(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
