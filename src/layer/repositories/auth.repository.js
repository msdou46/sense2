const { Op } = require("sequelize");

class AuthRepository {
  constructor(authModels) {
    this.authModels = authModels;
  }
}

module.exports = AuthRepository;
