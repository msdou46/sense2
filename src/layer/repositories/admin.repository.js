const { Op } = require("sequelize");
const { user, lecture } = require("../../sequelize/models");

class AdminRepository {
  constructor(adminModels) {
    this.adminModels = adminModels;
  }
  
  find_one_by_email_and_password = async (email, password) => {
    return await this.adminModels.findOne({where: {email, password}})
  }

  find_one_user_by_pk = async (user_id) => {
    return await this.adminModels.findByPk({ user_id });
  };

  update_to_admin = async (user_id, admin_type) => {
    return await this.adminModels.update(
      { type: admin_type },
      { where: { user_id } }
    );
  };

  find_all_lectures = async () => {
    return await this.adminModels.findAll();
  };
  update_lecture = async (
    lecture_id,
    lecturer,
    title,
    content,
    category,
    image,
    point
  ) => {
    return await this.adminModels.update(
      { lecturer, title, content, category, image, point },
      { where: { lecture_id } }
    );
  };
  destroy_lecture = async (lecture_id) => {
    return await this.adminModels.destroy({ where: { lecture_id } });
  };
  create_lecture = async (lecturer, title, content, category, image, point) => {
    return await this.adminModels.create({
      lecturer,
      title,
      content,
      category,
      image,
      point,
    });
  };
  
}

module.exports = AdminRepository;
