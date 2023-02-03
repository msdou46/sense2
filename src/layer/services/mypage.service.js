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

  

findAll = async () => {
const myorders = await this.orderModel.findAll()

let mylectures = []

for (let i=0; i< myorders.length; i++){
    const myorder = myorders[i].dataValues
      const lecture_id = myorder['lecture_id']
      const mylecture = await this.lectureModel.findOne(lecture_id)
      mylectures.push(mylecture)
}
return {"mylectures" : mylectures}
}

findUser = async () => {
  const user = await this.userModel.findUser()
  return {"user" : user}
}

editUser = async (nickname, email, user_id) => {
  await this.userModel.editUser(nickname, email, user_id)
}


}

module.exports = MypageService;
