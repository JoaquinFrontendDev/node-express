const Joi = require('joi');

const id = Joi.string();
const firstName = Joi.string().min(3).max(30);
const lastName = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string();
const phone = Joi.string().min(10);
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  }),
});

const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
