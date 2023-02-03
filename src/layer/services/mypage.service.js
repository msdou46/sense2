const MypageRepository = require("../repositories/mypage.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class MypageService {
  userModel = new MypageRepository(user);
  lectureModel = new MypageRepository(lecture);
  orderModel = new MypageRepository(order);
  cartModel = new MypageRepository(cart);

  // 강의 상세페이지에서 장바구니 추가
  add_cart = async (user_id, lecture_id) => {
    const add_cart = await this.cartModel.add_cart(lecture_id, user_id);
    return "테스트용 메세지";
  };

  // 장바구니에서 강의 삭제하기
  remove_cart = async (user_id, lecture_id) => {
    const remove_cart = await this.cartModel.remove_cart(user_id, lecture_id);
    return "테스트용 메세지입니다.";
  };

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  cart_list = async (user_id) => {
    const cart_list = await this.cartModel.cart_list(user_id);
    console.log("서비스단계의 값", cart_list);
    return cart_list.map((data) => {
      return {
        // user_id: data.user_id,
        lecture_id: data.lecture_id,
        lecturer: data.lecturer,
        title: data.title,
        content: data.content,
        category: data.category,
        iamge: data.iamge,
        point: data.point,
      };
    });
  };
}

module.exports = MypageService;
