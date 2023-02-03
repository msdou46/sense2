
const MainRepository = require("../repositories/main.repository");
const { cart, lecture, order, user } = require("../../sequelize/models/index.js")

class MainService {
    userModel = new MainRepository(user);
    lectureModel = new MainRepository(lecture);
    orderModel = new MainRepository(order);
    cartModel = new MainRepository(cart);
}

module.exports = MainService;