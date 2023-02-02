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

  get_cart_list = async (req, res) => {};

  add_cart = async (req, res) => {};

  sign_cart = async (req, res) => {};

  remove_cart = async (req, res) => {};

  get_my_lectures = async (req, res) => {};
}

module.exports = { MypageControllerRender, MypageControllerApi };
