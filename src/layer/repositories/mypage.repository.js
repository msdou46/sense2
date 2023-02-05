const { Op } = require("sequelize");
const { cart } = require("../../sequelize/models");
const { lecture } = require("../../sequelize/models");

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels;
  }

  find_orders = async () => {
    const myorders = await this.mypageModels.findAll({ where: { user_id: 1 } });
    return myorders;
  };

  find_lectures = async (lecture_id) => {
    const mylectures = await this.mypageModels.findOne({
      where: { lecture_id: lecture_id },
    });
    return mylectures;
  };

  find_user = async () => {
    const user = await this.mypageModels.findOne({ where: { user_id: 1 } });
    return user;
  };

  edit_user = async (nickname, email, user_id) => {
    await this.mypageModels.update(
      { nickname: nickname, email: email },
      { where: { user_id: user_id } }
    );
  };

  edit_pw = async (user_id, new_pw) => {
    await this.mypageModels.update(
      { password: new_pw },
      { where: { user_id: user_id } }
    );
  };

  add_cart = async (user_id, lecture_id) => {
    // const creat_add = `INSERT INTO cart (user_id, lecture_id) VALUES ('${user_id}','${lecture_id}')`
    try {
      const add_cart = await cart.create({ user_id, lecture_id });
      return add_cart;
    } catch (err) {
      console.log("알수없는 에러가 발생했습니다. [add_cart]", err);
      return;
    }
  };

  // 장바구니에서 강의 삭제하기
  remove_cart = async (user_id, lecture_id) => {
    try {
      const remove_cart = await cart.destroy({
        where: { lecture_id: lecture_id, user_id: user_id },
      });
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [remove_cart]", err);
    }
  };

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  cart_list = async (user_id) => {
    try {
      const cart_list = await cart.findAll({
        where: { user_id: user_id },
        // include: [
        //   {
        //     model: lecture,
        //     attributes: ["lecture_id"]
        //   }
        // ]
      });
      let a = [];
      for (let i = 0; i <= cart_list.length - 1; i++) {
        console.log("i의 값 : ", i);
        const b = await lecture.findAll({
          where: { lecture_id: i + 1 },
        });
        a.push(b[0].dataValues);
      }
      return a;
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [cart_list]", err);
    }
  };
}

module.exports = MypageRepository;
