const { Op } = require("sequelize");
const { lecture } = require("../../sequelize/models")
const { order } = require("../../sequelize/models")
const { cart } = require("../../sequelize/models");

class MainRepository {
  constructor(mainModels) {
    this.mainModels = mainModels;
  }

  find_lectures = async () => {
    const lectures = await this.mainModels.findAll();
    return lectures;
  };

  // 강의 상세보기
  show_lecture_detail = async(user_id,lecture_id) => {
    try {
      const show_lecture_detail = await lecture.findOne({
        raw: true,
        where: {lecture_id:lecture_id}
      })

      return show_lecture_detail
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [show_lecture_detail]", err);
    }
  }

  // 강의 상세보기에서 수강하기
  sign_cart = async(user_id,lecture_id) => {
    try {
      const sign_cart_create_in_order = await order.create({user_id,lecture_id})
      return sign_cart_create_in_order
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [sign_cart]", err);
      return;
    }
  }

  // 강의 상세보기에서 장바구니 추가하기
  add_cart = async(user_id,lecture_id) => {
    try {
      const add_cart = await cart.create({user_id,lecture_id})
      return add_cart
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [add_cart]", err);
      return;
    }
  }
}

module.exports = MainRepository;
