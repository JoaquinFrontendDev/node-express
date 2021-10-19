const faker = require('faker');
const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: faker.address.city(),
        id: faker.datatype.uuid(),
      });
    }
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy(id);
    return user;
  }
}
module.exports = UsersService;
