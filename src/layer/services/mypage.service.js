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
      console.log(222, lecture_id)
      const mylecture = await this.lectureModel.findOne(lecture_id)
      console.log(333, mylecture)
      mylectures.push(mylecture)
}

console.log(444, mylectures)
return {"mylectures" : mylectures}
}

findUser = async () => {
  const user = await this.userModel.findUser()
  return {"user" : user}
}


}

module.exports = MypageService;
