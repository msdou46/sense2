const MypageRepository = require("../repositories/mypage.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class MypageService {
  userModel = new MypageRepository(user);
  lecturModel = new MypageRepository(lecture);
  orderModel = new MypageRepository(order);
  cartModel = new MypageRepository(cart);
  add_cart = async (user_id,lecture_id) => {
    const add_cart = await this.cartModel.add_cart(lecture_id,user_id);
   return "테스트용 메세지"
  }

  // 장바구니에서 강의 삭제하기
  remove_cart = async(user_id,lecture_id) => {
    const remove_cart = await this.cartModel.remove_cart(user_id,lecture_id);
    return "테스트용 메세지입니다."
  }
}

module.exports = MypageService;
