const { Op } = require("sequelize");

class MypageRepository {
    constructor (mypageModels) {
        this.mypageModels = mypageModels;
    }
}

module.exports = MypageRepository;