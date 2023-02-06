const AdminService = require("../services/admin.service");

// 랜더링 용
class AdminControllerRender {
  adminservice = new AdminService();

  get_page_admin_user = async (req, res) => {
    res.render("admin/index", { ejsName: "manage-user" });
  };
  get_page_lectures = async (req, res) => {
    res.render("admin/index", { ejsName: "manage-lecture" });
  };
  get_page_add_lecture = async (req, res) => {
    res.render("admin/index", { ejsName: "add-lecture" });
  };
}

// api 용
class AdminControllerApi {
  adminservice = new AdminService();

  get_user_info = async (req, res) => {};

  // 관리자 권한 부여
  add_admin_user = async (req, res) => {
    const user_id = req.user_id;
    const admin_type = 99;

    try {
      await this.adminservice.update_admin_user(user_id, admin_type);
      return res.status(200).json({
        success: true,
        msg: "관리자 등록 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 전체 강의 목록
  get_lectures = async (req, res) => {
    const lecture_list = await this.adminservice.get_all_lectures();
    try {
      return res.status(200).json({ data: lecture_list });
    } catch (error) {
      console.log(error);
    }
  };

  // 강의 수정
  update_lecture = async (req, res) => {
    // 강의id로 수정할 강의 확인하기 위함
    const lecture_id = req.params.lecture_id;
    // 수정 할 field
    const { lecturer, title, content, category, image, point } = req.body;
    // 유저 타입 가져오기 예시
    // const type = res.locals.user.type;
    // 유저 타입이 99인 관리자만 수정 가능하도록 확인용
    // const user_type = await user.findOne({ where: { type } });
    try {
      // if (user_type !== 99) {
      //   return res.status(401).json({
      //     success: false,
      //     msg: "관리자만 수정 가능합니다.",
      //   });
      // }
      // if (!lecture || !title || !content || category || !image || !point) {
      //   return res.status(412).json({
      //     success: false,
      //     msg: "모든 항목을 작성해주세요.",
      //   });
      // }
      await this.adminservice.edit_lecture(
        lecture_id,
        lecturer,
        title,
        content,
        category,
        image,
        point
      );
      return res.status(201).json({
        success: true,
        msg: "강의 수정 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 강의 삭제
  remove_lecture = async (req, res) => {
    const lecture_id = req.params.lecture_id;
    // const type = res.locals.user.type;
    // const user_type = await user.findAll({ where: { type } });
    try {
      // if (user_type.type !== 99) {
      //   return res.status(401).json({
      //     success: false,
      //     msg: "관리자만 삭제 가능합니다.",
      //   });
      // }
      await this.adminservice.delete_lecture(lecture_id);
      return res.status(200).json({
        success: true,
        msg: "강의 삭제 완료",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 강의 등록
  add_lecture = async (req, res) => {
    const { lecturer, title, content, category, image, point } = req.body;
    try {
      const new_lecture = await this.adminservice.regist_lecture(
        lecturer,
        title,
        content,
        category,
        image,
        point
      );
      return res.status(200).json({
        success: true,
        msg: "강의 등록 완료",
        new_lecture,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = { AdminControllerRender, AdminControllerApi };
