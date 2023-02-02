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

  get_my_profile = async (req, res) => {
    try {

      const user = await this.mypageservice.findUser()

      return res.status(200).send({"profile" : user});
       
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
      }
  };

  update_my_profile = async (req, res) => {};

  get_cart_list = async (req, res) => {};

  add_cart = async (req, res) => {};

  sign_cart = async (req, res) => {};

  remove_cart = async (req, res) => {};

  get_my_lectures = async (req, res) => {

    try {

      const mylectures = await this.mypageservice.findAll()

      return res.status(200).send({"mylectures" : mylectures});
       
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
      }


  };
}

module.exports = { MypageControllerRender, MypageControllerApi };
