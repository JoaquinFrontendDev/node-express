const Joi = require('joi');

const id = Joi.string().uuid();
const categorie = Joi.string().min(3).max(20);
const cuantity = Joi.number().integer();

const getCategorieSchema = Joi.object({
  id: id.required(),
});

const createCategorieSchema = Joi.object({
  categorie: categorie.required(),
  cuantity: cuantity.required(),
});

const updateCategorieSchema = Joi.object({
  categorie: categorie,
  cuantity: cuantity,
});

module.exports = {
  getCategorieSchema,
  createCategorieSchema,
  updateCategorieSchema,
};
