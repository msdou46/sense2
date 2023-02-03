const MypageService = require("../services/mypage.service");

// 랜더링 용
class MypageControllerRender {
  mypageservice = new MypageService();

  get_page_mypage = async (req, res) => {
    res.render("myPage/mypage");
  };

  get_page_my_cart = async (req, res) => {
    res.render("myPage/cart");
  };

  get_page_my_lectures = async (req, res) => {
    res.render("myPage/lectures");
  };
}

// api 용
class MypageControllerApi {
  mypageservice = new MypageService();

  get_my_profile = async (req, res) => {};

  update_my_profile = async (req, res) => {};

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  get_cart_list = async (req, res, next) => {
    // const {user_id} = res.locals.user; // 테스트가 완료되면 주석해제 
    const user_id = 1;
    const cart_list = await this.mypageservice.cart_list(user_id);
    res.status(203).json({data:cart_list});
  };

  // 강의 상세보기에서 장바구니에 추가
  add_cart = async (req, res, next) => { 
    const {lecture_id} = req.body;
    const user_id = 1;
    const add_cart = await this.mypageservice.add_cart(lecture_id,user_id)
    res.status(201).json({ data: add_cart });
  };

  sign_cart = async (req, res) => {};

  // 장바구니에서 강의 삭제
  remove_cart = async (req, res, next) => {
    const {user_id, lecture_id} = req.body;
    console.log(user_id, lecture_id);
    const delete_cart = await this.mypageservice.remove_cart(user_id,lecture_id);
    res.status(202).json({ data: delete_cart});
  };

  get_my_lectures = async (req, res) => {};
}

module.exports = { MypageControllerRender, MypageControllerApi };
