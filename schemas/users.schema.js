const Joi = require('joi');

const id = Joi.string().uuid();
const firstName = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(20);
const address = Joi.string();

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
});

const updateUserSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  address: address,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
