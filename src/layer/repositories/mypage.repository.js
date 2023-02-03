const { Op } = require("sequelize");
const { cart } = require("../../sequelize/models")
const { lecture } = require("../../sequelize/models")

class MypageRepository {
  constructor(mypageModels) {
    this.mypageModels = mypageModels;
  }
  add_cart = async(user_id,lecture_id) => {
    // const creat_add = `INSERT INTO cart (user_id, lecture_id) VALUES ('${user_id}','${lecture_id}')`
    try {
      const add_cart = await cart.create({user_id,lecture_id})
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

 // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
    cart_list = async(user_id) => {
      try {
        const cart_list = await cart.findAll({
          where: {user_id:user_id},
          include: [
            {
              model: lecture,
              attributes: ["lecture_id"]
            }
          ]
        })
        // console.log(cart_list.length);
        // console.log(cart_list[0].lecture_id);
        // console.log(cart_list[1].lecture_id);
        // console.log(cart_list[2].lecture_id);
        // console.log(cart_list[3].lecture_id);

        let a = [];
        for(let i = 0; i<=cart_list.length - 1; i++) {
          // console.log(cart_list[i].lecture_id);

          const b = await lecture.findAll({
            where: {lecture_id:i+1}
          })
          a.push(b[0].dataValues)
          // console.log(b[0].dataValues);
          // a.push(b[0].dataValues)
        }
        // console.log(a);
        // const my_cart_list = await lecture.findAll({
        //   where: {lecture_id:3}
        // });
        // const {lecturer,title,content,category,image,point} = my_cart_list[0].dataValues
        // console.log(my_cart_list[0].dataValues.lecturer);
        // console.log(my_cart_list[0].dataValues.title);
        // console.log(my_cart_list[0].dataValues.content);
        // console.log(my_cart_list[0].dataValues.category);
        // console.log(my_cart_list[0].dataValues.image);
        // console.log(my_cart_list[0].dataValues.point);
        // console.log("강사명", lecturer);
        // console.log("강의명", title);
        // console.log("여기서부터 진짜 전달될 값", a);
        return a
      } catch (err) {
        console.log("알 수 없는 에러가 발생했습니다. [cart_list]", err);
      }
    }
}

module.exports = MypageRepository;
