const { Op } = require("sequelize");

class MainRepository {
  constructor(mainModels) {
    this.mainModels = mainModels;
  }

  find_lectures = async () => {
    const lectures = await this.mainModels.findAll();
    return lectures;
  };

  // 강의 상세보기
  show_lecture_detail = async(user_id,lecture_id) => {
    try {
      const show_lecture_detail = await lecture.findOne({
        where: {lecture_id:lecture_id}
      })

      return show_lecture_detail
    } catch (err) {
      console.log("알 수 없는 에러가 발생했습니다. [show_lecture_detail]", err);
    }
  }
}

module.exports = MainRepository;
