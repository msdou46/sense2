
const AdminRepository = require("../repositories/admin.repository");
const { cart, lecture, order, user } = require("../../sequelize/models/index.js")

class AdminService {
    userModel = new AdminRepository(user);
    lectureModel = new AdminRepository(lecture);
    orderModel = new AdminRepository(order);
    cartModel = new AdminRepository(cart);
}

module.exports = AdminService;