const { Op } = require("sequelize");

class AdminRepository {
  constructor(adminModels) {
    this.adminModels = adminModels;
  }

  find_one_user_by_type = async (type) => {
    return await this.adminModels.findOne({where:{type}})
  }

  find_admin_user_by_type = async (admin_type) => {
    return await this.adminModels.findOne({where: {admin_type}})
  }
}

module.exports = AdminRepository;
