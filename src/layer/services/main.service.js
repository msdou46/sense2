const MainRepository = require("../repositories/main.repository");
const {
  cart,
  lecture,
  order,
  user,
} = require("../../sequelize/models/index.js");

const axios = require("axios");

class MainService {
  userModel = new MainRepository(user);
  lectureModel = new MainRepository(lecture);
  orderModel = new MainRepository(order);
  cartModel = new MainRepository(cart);
  q;
  find_lectures = async () => {
    const lectures = await this.lectureModel.find_lectures();
    return lectures;
  };

  // 강의 상세보기
  show_lecture_detail = async(user_id,lecture_id) => {
    const show_lecture_detail = await this.lectureModel.show_lecture_detail(user_id,lecture_id);
    return {
        lecture_id: show_lecture_detail.lecture_id,
        merchant_uid: show_lecture_detail.merchant_uid,
        lecturer: show_lecture_detail.lecturer,
        title: show_lecture_detail.title,
        content: show_lecture_detail.content,
        category: show_lecture_detail.category,
        image: show_lecture_detail.image,
        point: show_lecture_detail.point,
      }
  }

  // 강의 상세보기에서 수강하기
  sign_cart = async (user_id,lecture_id) => {
    const sign_cart = await this.lectureModel.sign_cart(user_id,lecture_id);
    return sign_cart
  }

  // 강의 상세보기에서 장바구니 추가하기
  add_cart = async (user_id,lecture_id) => {
    const add_cart = await this.lectureModel.add_cart(user_id,lecture_id)
    return add_cart
  }

  // 강의 상세보기에서 수강하기 클릭 시, 먼저 결제 정보 일치 체크
  checking_payment = async (user_id, lecture_id, imp_uid, merchant_uid) => {
    try {
      // 액세스 토큰 발급받기
      const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
        data: {
          imp_key: process.env.PORTONE_API_KEY, // REST API 키
          imp_secret: process.env.PORTONE_API_SECRET_KEY // REST API Secret
        }
      });
      const { access_token } = getToken.data.response; // 인증 토큰

      // imp_uid로 아임포트 서버에서 결제 정보 조회
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: "get", // GET method
        headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
      });
      const paymentData = getPaymentData.data.response; // 조회한 결제 정보

      // 결제금액의 위변조 여부를 검증.
      // 클라이언트에서 입력받은 merchant_uid 와 토큰으로 가져온 merchant_uid 이 다르다면 에러
      if (merchant_uid !== paymentData.merchant_uid) {
        throw new Error("입력받은 상품번호가 잘못되었습니다.")
      }
      // db에서 해당 상품의 금액 조회
      const lecture = await this.lectureModel.get_lecture_by_id_and_merchant(lecture_id, paymentData.merchant_uid);
      // const amount_tobe_paid = lecture.point; // 원래는 이게 맞는데, 현재는 100원으로 고정
      const amount_tobe_paid = 100;

      // 결제 검증하기
      const { amount, status, pay_method } = paymentData;
      console.log("api 로 가져온 결제 내역")
      console.log(paymentData);
      if (amount === amount_tobe_paid) {
        console.log("문제 없으니 db에 오더 추가");
        console.log(amount, typeof amount);
        // DB에 결제 내역 저장
        const insert_order = await this.orderModel.insert_order(
          user_id, 
          lecture_id,
          paymentData.imp_uid,
          paymentData.merchant_uid,
          amount,
          pay_method,
          status
        );

        switch (status) {
          case "ready":
            console.log("가상 계좌가 발급되었음.");
            return true
          case "paid":
            return true
        }
      } else {
        throw new Error("소비자가 지불한 금액과 클라이언트에게서 입력받은 금액이 일치하지 않습니다.")
      }
    } catch (err) {
      console.log("---error in payment---");
      console.log(err);
      return false
    }
  }
}

module.exports = MainService;
