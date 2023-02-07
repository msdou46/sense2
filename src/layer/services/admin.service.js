const AdminRepository = require("../repositories/admin.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class AdminService {
  userModel = new AdminRepository(user);
  lectureModel = new AdminRepository(lecture);
  orderModel = new AdminRepository(order);
  cartModel = new AdminRepository(cart);

  get_user_info = async (email, password) => {
    return await this.userModel.find_one_by_email(email);
  };

  // 관리자 권한 부여
  update_admin_user = async (user_id, admin_type) => {
    return await this.userModel.update_to_admin(user_id, admin_type);
  };
  // 강의 목록 조회
  get_all_lectures = async () => {
    return await this.lectureModel.find_all_lectures();
  };

  // 강의 상세 조회
  get_detail_lecture = async (lecture_id) => {
    return await this.lectureModel.find_lecture(lecture_id);
  };
  // 강의 수정
  edit_lecture = async (
    lecture_id,
    lecturer,
    title,
    content,
    category,
    image,
    point
  ) => {
    return await this.lectureModel.update_lecture(
      lecture_id,
      lecturer,
      title,
      content,
      category,
      image,
      point
    );
  };
  // 강의 삭제
  delete_lecture = async (lecture_id) => {
    return await this.lectureModel.destroy_lecture(lecture_id);
  };
  // 강의 등록
  regist_lecture = async (lecturer, title, content, category, point) => {
    return await this.lectureModel.create_lecture(
      lecturer,
      title,
      content,
      category,
      point
    );
  };
}

module.exports = AdminService;
