const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();

const getCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
});

module.exports = {
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
};
