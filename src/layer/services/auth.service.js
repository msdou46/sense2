const AuthRepository = require("../repositories/auth.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class AuthService {
  userModel = new AuthRepository(user);
  lecturModel = new AuthRepository(lecture);
  orderModel = new AuthRepository(order);
  cartModel = new AuthRepository(cart);
}

module.exports = AuthService;
