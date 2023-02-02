const { Op } = require("sequelize");
const { cart } = require("../../sequelize/models")

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels;
  }
  add_cart = async(user_id,lecture_id) => {
    // const creat_add = `INSERT INTO cart (user_id, lecture_id) VALUES ('${user_id}','${lecture_id}')`
    try {
      const add_cart = await cart.create({user_id,lecture_id})
      console.log("저장되었나요?");
      return add_cart
    } catch (err) {
      console.log("알수없는 에러가 발생했습니다. [add_cart]", err);
      return
    }
  }

  // 장바구니에서 강의 삭제하기
  remove_cart = async(user_id,lecture_id) => {
    try {
      const remove_cart = await cart.destroy({
        where: {lecture_id:lecture_id , user_id:user_id}
      })
  } catch (err) {
    console.log("알 수 없는 에러가 발생했습니다. [remove_cart]", err);
  }
}
}

module.exports = MypageRepository;
