const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        categorie: faker.commerce.product(),
        cuantity: +faker.datatype.number(),
        id: faker.datatype.uuid(),
      });
    }
  }

  async create(data) {
    const newCategorie = {
      ...data,
      id: faker.datatype.uuid(),
    };
    this.categories.push(newCategorie);
    return newCategorie;
  }

  async find() {
    return this.categories;
  }

  async findOne(id) {
    const categorie = this.categories.find((item) => item.id === id);
    if (!categorie) {
      throw boom.notFound(`Categorie doesn't exist`);
    }
    return categorie;
  }

  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Categorie not found');
    } else {
      const categorie = this.categories[index];
      this.categories[index] = {
        ...categorie,
        ...changes,
      };
      return this.categories[index];
    }
  }

  async delete(id) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Categorie not found');
    }
    this.categories.splice(index, 1);
    return { message: `Categorie eliminado con ID: ${id}` };
  }
}

module.exports = CategoriesService;
