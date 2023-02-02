const { Op } = require("sequelize");

class AdminRepository {
    constructor (adminModels) {
        this.adminModels = adminModels;
    }
}

module.exports = AdminRepository;