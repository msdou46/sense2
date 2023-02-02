const MypageRepository = require("../repositories/mypage.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

class MypageService {
  userModel = new MypageRepository(user);
  lecturModel = new MypageRepository(lecture);
  orderModel = new MypageRepository(order);
  cartModel = new MypageRepository(cart);

  

findAll = async () => {
const myorders = await this.orderModel.findAll()

let mylectures = []

for (let i=0; i< myorders.length; i++){
    const myorder = myorders[i].dataValues
      const lecture_id = myorder['lecture_id']
      const mylecture = await this.orderModel.findOne(lecture_id)
      mylectures.push(mylecture)
}

return {"mylectures" : mylectures}
}



}

module.exports = MypageService;
