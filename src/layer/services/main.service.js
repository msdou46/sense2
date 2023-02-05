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
    return show_lecture_detail.map((data) => {
      return {
        lecture_id: data.lecture_id,
        lecturer: data.lecturer,
        title: data.title,
        content: data.content,
        category: data.category,
        image: data.image,
        point: data.point,
      }
    })
  }
}

module.exports = MainService;
