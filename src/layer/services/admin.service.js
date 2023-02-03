const AdminRepository = require("../repositories/admin.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class AdminService {
  userModel = new AdminRepository(user);
  lecturModel = new AdminRepository(lecture);
  orderModel = new AdminRepository(order);
  cartModel = new AdminRepository(cart);

  update_admin_user = async (user_id, admin_type) => {
    // if (admin_type !== 99) {
    //   return res.status(401).json({
    //     success: false,
    //     msg: "관리자만 수정 가능합니다.",
    //   });
    // }
    // if (change_user.type !== 1) {
    //   return res.stauts(412).json({
    //     success: false,
    //     msg: "유효하지 않은 유저입니다.",
    //   });
    // }
    await this.AdminRepository()
  }
}

module.exports = AdminService;
