const MainRepository = require("../repositories/main.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class MainService {
  userModel = new MainRepository(user);
  lectureModel = new MainRepository(lecture);
  orderModel = new MainRepository(order);
  cartModel = new MainRepository(cart);

  find_lectures = async () => {
    const lectures = await this.lectureModel.find_lectures();
    return lectures;
  };

  // 강의 상세보기
  show_lecture_detail = async(user_id,lecture_id) => {
    const show_lecture_detail = await this.lectureModel.show_lecture_detail(user_id,lecture_id);
    return {
        lecture_id: show_lecture_detail.lecture_id,
        lecturer: show_lecture_detail.lecturer,
        title: show_lecture_detail.title,
        content: show_lecture_detail.content,
        category: show_lecture_detail.category,
        image: show_lecture_detail.image,
        point: show_lecture_detail.point,
      }
  }

  // 강의 상세보기에서 수강하기
  sign_cart = async (user_id,lecture_id) => {
    const sign_cart = await this.lectureModel.sign_cart(user_id,lecture_id);
    return 
  }

  // 강의 상세보기에서 장바구니 추가하기
  add_cart = async (user_id,lecture_id) => {
    const add_cart = await this.lectureModel.add_cart(user_id,lecture_id)
    return 
  }
}

module.exports = MainService;
