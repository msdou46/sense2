const { Op } = require("sequelize");

class MainRepository {
  constructor(mainModels) {
    this.mainModels = mainModels;
  }

  find_lectures = async () => {
    const lectures = await this.mainModels.findAll();
    return lectures;
  };
}

module.exports = MainRepository;
