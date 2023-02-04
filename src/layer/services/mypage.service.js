const MypageRepository = require("../repositories/mypage.repository");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const util = require("util");
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

  //내 강의 목록 찾기
  find_orders = async (user_id) => {
    const myorders = await this.orderModel.find_orders(user_id);

    let mylectures = [];

    for (let i = 0; i < myorders.length; i++) {
      const myorder = myorders[i].dataValues;
      const lecture_id = myorder["lecture_id"];
      const mylecture = await this.lectureModel.find_lectures(lecture_id);
      mylectures.push(mylecture);
    }
    return { mylectures: mylectures };
  };

  //내 프로필 
  find_user = async (user_id) => {
    const user = await this.userModel.find_user(user_id);
    return { user: user };
  };

  //프로필 & 비밀번호 수정 통합
  edit_profile = async (user_id, nickname, email, origin_pw, new_pw) => {
    const user = await this.userModel.find_user(user_id);
      const password = user.password;
      const salt= user.salt

      const input_pw = await this.check_account_password(origin_pw, salt);
      
      if (input_pw == password) {
        if (new_pw != undefined) {
          const confirm_pw = await this.check_account_password(new_pw, salt);

          await this.userModel.edit_pw(user_id, confirm_pw);
          return { message: "비밀번호를 수정하였습니다" };
        } 
        else {
          await this.userModel.edit_user(nickname, email, user_id);
          return { message: "프로필을 수정하였습니다" };
        }
      } 
      else if (input_pw != password) {
        return { message: " 현재 비밀번호가 틀렸습니다!" };
      }
    } 


  check_account_password = async (password, salt) => {
    const pbkdf2Promise = util.promisify(crypto.pbkdf2);
    const hashedPassword = await pbkdf2Promise(password, salt, 100000, 64, "sha512");
    const encodedHashedPassword = hashedPassword.toString("base64")
    return encodedHashedPassword;
}
  
  // 강의 상세페이지에서 장바구니 추가
  add_cart = async (user_id, lecture_id) => {
    const add_cart = await this.cartModel.add_cart(lecture_id, user_id);
    return "테스트용 메세지";
  };

  // 장바구니에서 강의 삭제하기
  remove_cart = async (user_id, lecture_id) => {
    const remove_cart = await this.cartModel.remove_cart(user_id, lecture_id);
    return "테스트용 메세지입니다.";
  };

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  cart_list = async (user_id) => {
    const cart_list = await this.cartModel.cart_list(user_id);
    console.log("서비스단계의 값", cart_list);
    return cart_list.map((data) => {
      return {
        // user_id: data.user_id,
        lecture_id: data.lecture_id,
        lecturer: data.lecturer,
        title: data.title,
        content: data.content,
        category: data.category,
        iamge: data.iamge,
        point: data.point,
      };
    });
  };
  
}

module.exports = MypageService;
