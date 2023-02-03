const AdminService = require("../services/admin.service");

// 랜더링 용
class AdminControllerRender {
  adminservice = new AdminService();

  get_page_admin_user = async (req, res) => {
    res.render("admin/manage-user");
  };

  get_page_lectures = async (req, res) => {
    res.render("admin/manage-lecture");
  };

  get_page_add_lecture = async (req, res) => {
    res.render("admin/add-lecture");
  };
}

// api 용
class AdminControllerApi {
  adminservice = new AdminService();

  add_admin_user = async (req, res) => {
    const user_id = req.params.user_id
    const admin_type = 99
    
    try {
      const update_user_type = await this.adminservice(
        user_id, admin_type
      )
      return res.status(200).json({
        success: true,
        msg: "관리자 등록 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  get_lectures = async (req, res) => {
    const lecture_list = await lecture.findAll();
    try {
      return res.status(200).send(lecture_list);
    } catch (error) {
      console.log(error);
    }
  };

  update_lecture = async (req, res) => {
    // 강의id로 수정할 강의 확인하기 위함
    const lecture_id = req.params.lecture_id;
    // 수정 할 field
    const { lecture, title, content, category, image, point } = req.body;
    // 유저 타입 가져오기 예시
    const type = res.locals.user.type;
    // 유저 타입이 99인 관리자만 수정 가능하도록 확인용
    const user_type = await user.findOne({ where: { type } });
    try {
      if (user_type !== 99) {
        return res.status(401).json({
          success: false,
          msg: "관리자만 수정 가능합니다.",
        });
      }
      if (!lecture || !title || !content || category || !image || !point) {
        return res.status(412).json({
          success: false,
          msg: "모든 항목을 작성해주세요.",
        });
      }
      await lecture.update(
        { lecture, title, content, category, image, point },
        { where: { lecture_id } }
      );
      return res.status(201).json({
        success: true,
        msg: "강의 수정 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  remove_lecture = async (req, res) => {
    const lecture_id = req.params.lecture_id;
    const type = res.locals.user.type;
    const user_type = await user.findAll({ where: { type } });
    try {
      if (user_type !== 99) {
        return res.status(401).json({
          success: false,
          msg: "관리자만 삭제 가능합니다.",
        });
      }
      await lecture.destroy({ where: { lecture_id } });
      return res.status(200).json({
        success: true,
        msg: "강의 삭제 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  add_lecture = async (req, res) => {
    const { lecture, title, content, category, image, point } = req.body;
    const type = res.locals.user.type;
    const user_type = await user.findAll({ where: { type } });
    try {
      if (user_type !== 99) {
        return res.status(401).json({
          success: false,
          msg: "관리자만 삭제 가능합니다.",
        });
      }
      await lecture.create({ lecture, title, content, category, image, point });
      return res.status(200).json({
        success: true,
        msg: "강의 등록 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = { AdminControllerRender, AdminControllerApi };
