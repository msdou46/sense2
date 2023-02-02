const { Op } = require("sequelize");

class MainRepository {
    constructor (mainModels) {
        this.mainModels = mainModels;
    }
}

module.exports = MainRepository;