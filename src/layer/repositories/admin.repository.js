const { Op } = require("sequelize");
const user = require("../../sequelize/models/user");

class AdminRepository {
  constructor(adminModels) {
    this.adminModels = adminModels;
  }

  find_one_user_by_pk = async (user_id) => {
    return await this.adminModels.findByPk({ user_id })
  }

  update_to_admin = async (user_id) => {
    return await this.adminModels.update({ type : 99 }, { where: { user_id } })
  }
}

module.exports = AdminRepository;
