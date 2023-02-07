const { Op } = require("sequelize");
const { cart } = require("../../sequelize/models");
const { lecture } = require("../../sequelize/models");
const { order } = require("../../sequelize/models");
const { user } = require("../../sequelize/models")

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

  // 강의 상세보기에서 장바구니 추가하기
  add_cart = async (user_id, lecture_id) => {

    const check_add_cart = await cart.findOne({
      where: {user_id:user_id, lecture_id:lecture_id}
    })

    try {
      if (check_add_cart) {
        console.log("해당 강의는 이미 장바구니에 존재합니다.");
        return check_add_cart
      }

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

  // 장바구니에서 강의 수강하기
  sign_cart = async (user_id,lecture_id) => {
    const check_sign_cart = await order.findOne({
      where : {user_id:user_id, lecture_id:lecture_id}
    })
    const user_point = await user.findOne({
      raw: true,
      where: {user_id:user_id}
    })
    
    const lecture_point = await lecture.findOne({
      raw: true,
      where : {lecture_id:lecture_id}
    })

    try {

      if(check_sign_cart) {
        return "이미 수강중인 강의입니다."
      }

      if (user_point["point"] < lecture_point["point"]) {
        return "포인트가 부족하여 수강할 수 없습니다."
      }
      
      const sign_cart_create_in_order = await order.create({user_id,lecture_id});
      const sign_cart_delete_in_cart = await cart.destroy({
        where: { user_id: user_id, lecture_id: lecture_id  },
      })
      const cunsume_point = await user.update({point:user_point["point"]-lecture_point["point"]},{where:{user_id:user_id}})
      return "정상적으로 수강 완료하였습니다."
    } catch(err) {
      console.log("알 수 없는 에러가 발생했습니다. [sign_cart]", err);
    }
  }

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  cart_list = async (user_id) => {
    try {
      let b = [];
      const cart_list = await cart.findAll({
        where: { user_id: user_id },
      });

      let count = cart_list.length;
      for (let i =0; i <= count -1; i++) {
        b.push(cart_list[i].dataValues.lecture_id)
      };

      const result = await lecture.findAll({
        raw: true, // 이것이 정말 신의 한수!!
        where: {
          lecture_id: b
        }
      })

      return result;
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [cart_list]", err);
    }
  };
}

module.exports = MypageRepository;
