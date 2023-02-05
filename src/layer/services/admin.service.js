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


  // 관리자 타입 체크
  check_admin_type = async (admin_type) => {
    try{
      if (!admin_type !== 99) {
        const err = new Error("권한이 없습니다.");
        err.name = "AccessDenied";
        throw err;
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  
  }
  // 관리자 권한 부여
  update_admin_user = async (user_id, admin_type) => {
      return await this.userModel.update_to_admin(user_id, admin_type); 
  };
  // 강의 목록 조회
  get_all_lectures = async () => {
    return await this.lectureModel.find_all_lectures();
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
  regist_lecture = async (lecturer, title, content, category, image, point) => {
    return await this.lectureModel.create_lecture(
      lecturer,
      title,
      content,
      category,
      image,
      point
    );
  };


module.exports = AdminService;
