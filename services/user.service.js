const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
class UserService {

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      attributes: { exclude: ['password', 'recoveryToken']}
    });
    
    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if(!user) {
      throw boom.notFound('user not found');
    }

    return user;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async update(id, changes) {
    const user = await  this.findOne(id);
    const response = user.update(changes);
    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;