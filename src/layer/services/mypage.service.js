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

  

  find_orders = async () => {
const myorders = await this.orderModel.find_orders()

let mylectures = []

for (let i=0; i< myorders.length; i++){
    const myorder = myorders[i].dataValues
      const lecture_id = myorder['lecture_id']
      const mylecture = await this.lectureModel.find_lectures(lecture_id)
      mylectures.push(mylecture)
}
return {"mylectures" : mylectures}
}

find_user = async () => {
  const user = await this.userModel.find_user()
  return {"user" : user}
}

edit_user = async (nickname, email, user_id) => {
  await this.userModel.edit_user(nickname, email, user_id)
}

edit_pw = async (user_id, new_pw) => {
  await this.userModel.edit_pw(user_id, new_pw)
}


}

module.exports = MypageService;
