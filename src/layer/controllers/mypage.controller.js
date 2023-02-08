const MypageService = require("../services/mypage.service");
const AuthService = require("../services/auth.service");

// 랜더링 용
class MypageControllerRender {
  mypageservice = new MypageService();
  authService = new AuthService();

  get_page_mypage = async (req, res) => {
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("myPage/mypage", {user_info: user_info});
  };

  get_page_my_cart = async (req, res) => {
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("myPage/cart", {user_info: user_info});
  };

  get_page_my_lectures = async (req, res) => {
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("myPage/lectures", {user_info: user_info});
  };
}

// api 용
class MypageControllerApi {
  mypageservice = new MypageService();

  // 내 프로필 찾기
  get_my_profile = async (req, res) => {
    try {
      const user_id = res.locals.user_id;
      const user = await this.mypageservice.find_user(user_id);

      return res.status(200).send({ profile: user });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };

  // 내 프로필 & 비밀번호 수정
  update_my_profile = async (req, res) => {
    const { nickname, email, origin_pw, new_pw } = req.body;
    const user_id = res.locals.user_id;
    try {
      //현재 비밀번호 확인 검사
      await this.mypageservice.checking_password(origin_pw, user_id);

      if (new_pw != undefined) {
        //새 비밀번호 조건 검사
        await this.mypageservice.checking_pw(new_pw);
      } else {
        // 새 이메일 조건 검사
        await this.mypageservice.checking_email(email, user_id);
      }
    } catch (err) {
      return res.status(500).send({ success: false, error_message: err.message });
    }

    try {
      const message = await this.mypageservice.edit_profile(
        user_id,
        nickname,
        email,
        new_pw
      );
      return res.status(200).send({ message });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };

  // 내 강의 목록 찾기
  get_my_lectures = async (req, res) => {
    try {
      const user_id = res.locals.user_id;
      const mylectures = await this.mypageservice.find_orders(user_id);

      return res.status(200).send({ mylectures: mylectures });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };

  // 장바구니 페이지로 갔을때 장바구니 리스트 불러오기
  get_cart_list = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const cart_list = await this.mypageservice.cart_list(user_id);
    return res.status(203).json({ data: cart_list });
  };

  // 강의 상세보기에서 장바구니에 추가
  add_cart = async (req, res, next) => {
    const { lecture_id } = req.body;
    const user_id = res.locals.user_id;
    const add_cart = await this.mypageservice.add_cart(lecture_id, user_id);
    return res.status(201).send({ response: add_cart });
  };

  // 장바구니에서 강의 수강
  sign_cart = async (req, res, next) => {
    const {lecture_id} = req.body;
    const user_id = res.locals.user_id;
    const sign_cart = await this.mypageservice.sign_cart(user_id,lecture_id);
    const send_message = JSON.stringify(sign_cart)
    return res.status(200).json({ data:send_message})
  };

  // 장바구니에서 강의 삭제
  remove_cart = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const { lecture_id } = req.body;
    const delete_cart = await this.mypageservice.remove_cart(
      user_id,
      lecture_id
    );
    return res.status(202).json({ data: delete_cart });
  };
}

module.exports = { MypageControllerRender, MypageControllerApi };
