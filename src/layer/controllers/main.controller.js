const MainService = require("../services/main.service");

// 랜더링 용
class MainControllerRender {
  mainService = new MainService();

  get_page_main = async (req, res) => {
    res.render("main/main");
  };

  // 강의 상세보기
  get_page_lecture_detail = async (req, res, next) => {
    const user_id = res.locals.user_id;
    const lecture_id = req.body.lecture_id;
    console.log(lecture_id);
    // const show_lecture_detail = await this.mainService.show_lecture_detail(user_id, lecture_id);
    res.render("main/lecture-detail");
  };
}

// api 용
class MainControllerApi {
  mainService = new MainService();

  get_lectures_list = async (req, res) => {
    try {
      const lectures = await this.mainService.find_lectures();

      return res.status(200).send({ lectures: lectures });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: error.message });
    }
  };
}

module.exports = { MainControllerRender, MainControllerApi };
