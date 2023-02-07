const MainService = require("../services/main.service");
const AuthService = require("../services/auth.service");

// 랜더링 용
class MainControllerRender {
  mainService = new MainService();
  authService = new AuthService();

  get_page_main = async (req, res) => {
    if (!res.locals.user_id) {
      return res.render("main/main", {user_info: false});
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("main/main", {user_info: user_info});
  };

  // 강의 상세보기
  get_page_lecture_detail = async (req, res, next) => {
    if (!res.locals.user_id) {
      return res.render("main/lecture-detail", {user_info: false});
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("main/lecture-detail", {user_info: user_info});
  };
}

// api 용
class MainControllerApi {
  mainService = new MainService();

  get_lectures_detail = async (req,res,next) => {
    const user_id = res.locals.user_id;
    const a = req.params.lecture_id;
    const lecture_id = Number(a);
    const show_lecture_detail = await this.mainService.show_lecture_detail(user_id, lecture_id);
    
    res.status(201).json({ data:show_lecture_detail })
  }

  get_lectures_list = async (req, res) => {
    // try {
      const lectures = await this.mainService.find_lectures();

      return res.status(200).send({ lectures: lectures });
    // }
    //  catch (error) {
    //   console.error(error);
    //   return res.status(500).send({ message: error.message });
    // }
  };

  // 강의 상세보기에서 바로 수강하기
  sign_cart = async (req,res) => {
    const { lecture_id } = req.body;
    const user_id = res.locals.user_id;
    const sign_cart = await this.mainService.sign_cart(user_id,lecture_id);
    const send_message = JSON.stringify(sign_cart)
    return res.status(200).json({ data: send_message})
  }

  // 강의 상세보기에서 장바구니에 추가하기
  add_cart = async (req,res,next) => {
    const { lecture_id } = req.body;
    const user_id = res.locals.user_id;
    const add_cart = await this.mainService.add_cart(user_id,lecture_id);
    const send_message = JSON.stringify(add_cart)
    return res.status(200).json({ data: send_message})
  }
}

module.exports = { MainControllerRender, MainControllerApi };
