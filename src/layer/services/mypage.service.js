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

  find_orders = async () => {
    const myorders = await this.orderModel.find_orders();

    let mylectures = [];

    for (let i = 0; i < myorders.length; i++) {
      const myorder = myorders[i].dataValues;
      const lecture_id = myorder["lecture_id"];
      const mylecture = await this.lectureModel.find_lectures(lecture_id);
      mylectures.push(mylecture);
    }
    return { mylectures: mylectures };
  };

  find_user = async () => {
    const user = await this.userModel.find_user();
    return { user: user };
  };

  edit_user = async (nickname, email, user_id) => {
    await this.userModel.edit_user(nickname, email, user_id);
  };

  edit_pw = async (user_id, new_pw) => {
    await this.userModel.edit_pw(user_id, new_pw);
  };

  // 강의 상세페이지에서 장바구니 추가
  add_cart = async (user_id, lecture_id) => {
    const add_cart = await this.cartModel.add_cart(lecture_id, user_id);
    return "테스트용 메세지 [add_cart]";
  };

  // 장바구니에서 강의 삭제하기
  remove_cart = async (user_id, lecture_id) => {
    const remove_cart = await this.cartModel.remove_cart(user_id, lecture_id);
    return "테스트용 메세지입니다.[remove_cart]";
  };

  // 장바구니에서 강의 수강하기
  sign_cart = async (user_id,lecture_id) => {
    const sign_cart = await this.cartModel.sign_cart(user_id,lecture_id);
    return sign_cart
  }

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  cart_list = async (user_id) => {
    const cart_list = await this.cartModel.cart_list(user_id);
    return cart_list.map((data) => {
      return {
        // user_id: data.user_id,
        lecture_id: data.lecture_id,
        lecturer: data.lecturer,
        title: data.title,
        content: data.content,
        category: data.category,
        image: data.image,
        point: data.point,
      };
    });
  };
}

module.exports = MypageService;
