const { Op } = require("sequelize");
const { lecture } = require("../../sequelize/models");
const { order } = require("../../sequelize/models");
const { cart } = require("../../sequelize/models");
const { user } = require("../../sequelize/models");

class MainRepository {
  constructor(mainModels) {
    this.mainModels = mainModels;
  }

  find_lectures = async () => {
    const lectures = await this.mainModels.findAll({
      order: [['lecture_id', 'DESC']]
    });
    return lectures;
  };

  // 강의 상세보기
  show_lecture_detail = async (user_id, lecture_id) => {
    try {
      const show_lecture_detail = await lecture.findOne({
        raw: true,
        where: { lecture_id: lecture_id },
      });

      return show_lecture_detail;
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [show_lecture_detail]", err);
    }
  };

  // 강의 상세보기에서 수강하기
  sign_cart = async (user_id, lecture_id) => {
    const check_sign_cart = await order.findOne({
      where: { user_id: user_id, lecture_id: lecture_id },
    });

    const user_point = await user.findOne({
      raw: true,
      where: { user_id: user_id },
    });

    const lecture_point = await lecture.findOne({
      raw: true,
      where: { lecture_id: lecture_id },
    });

    try {
      if (check_sign_cart) {
        return "해당 강의는 이미 수강중인 강의입니다.";
      }

      if (user_point["point"] < lecture_point["point"]) {
        return "포인트가 부족하여 수강할 수 없습니다.";
      }

      const sign_cart_create_in_order = await order.create({
        user_id,
        lecture_id,
      });
      const cunsume_point = await user.update(
        { point: user_point["point"] - lecture_point["point"] },
        { where: { user_id: user_id } }
      );
      return "정상적으로 수강 완료하였습니다.";
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [sign_cart]", err);
      return;
    }
  };

  // 강의 상세보기에서 장바구니 추가하기
  add_cart = async (user_id, lecture_id) => {
    const check_add_cart = await cart.findOne({
      where: { user_id: user_id, lecture_id: lecture_id },
    });
    try {
      if (check_add_cart) {
        return "해당 강의는 이미 장바구니에 존재합니다.";
      }
      const add_cart = await cart.create({ user_id, lecture_id });
      return "장바구니에서 정상적으로 추가하였습니다.";
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [add_cart]", err);
      return err;
    }
  }

  // lecture_id 로만 강의 상세 가져오기
  get_lecture_by_id_and_merchant = async (lecture_id, merchant_uid) => {
    const lecture = await this.mainModels.findOne({
      where: {
        [Op.and] : [
          { lecture_id }, 
          { merchant_uid }
        ]
      }
    });
    return lecture
  }

  // 결제 검증 후 주문 내역 추가
  insert_order = async (user_id, lecture_id, imp_uid, merchant_uid, amount, pay_method, order_status) => {
    console.log("내역 추가 진입")
    console.log(user_id, lecture_id, imp_uid, merchant_uid, amount, pay_method, order_status);
    console.log("----특히 가격.", amount, typeof amount);
    
    const order = await this.mainModels.create({
      user_id,
      lecture_id,
      imp_uid,
      merchant_uid,
      amount,
      pay_method,
      order_status
    });
    return order
  }
  
}

module.exports = MainRepository;
