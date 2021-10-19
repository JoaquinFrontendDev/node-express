const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const getUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

module.exports = {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
};
