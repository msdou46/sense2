const { Op } = require("sequelize");

class AuthRepository {
  constructor(authModels) {
    this.authModels = authModels;
  }

  get_account_by_email = async (email) => {
    const check_email = await this.authModels.findOne({ where: { email } });
    return check_email;
  };

  get_account_by_nickname = async (nickname) => {
    const check_nickname = await this.authModels.findOne({
      where: { nickname },
    });
    return check_nickname;
  };

  insert_user_account = async (email, nickname, password, salt) => {
    const insert_result = await this.authModels.create({
      email,
      nickname,
      password,
      salt,
      type: 1,
    });
    return { user_id: insert_result.user_id, type: insert_result.type };
  };
}

module.exports = AuthRepository;
