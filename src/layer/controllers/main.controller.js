const MainService = require("../services/main.service");

// 랜더링 용
class MainControllerRender {
  mainService = new MainService();

  get_page_main = async (req, res) => {
    res.render("main/main");
  };

  get_page_lecture_detail = async (req, res) => {
    res.render("main/lecture-detail");
  };
}

// api 용
class MainControllerApi {
  mainService = new MainService();

  get_lectures_list = async (req, res) => {};
}

module.exports = { MainControllerRender, MainControllerApi };
