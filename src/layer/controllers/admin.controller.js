const AdminService = require("../services/admin.service");
const AuthService = require("../services/auth.service");

// 랜더링 용
class AdminControllerRender {
  adminservice = new AdminService();
  authService = new AuthService();

  get_page_admin_user = async (req, res) => {
    if (!res.locals.user_id) {
      return res.render("admin/index", { ejsName: "manage-user", user_info: false });
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("admin/index", { ejsName: "manage-user", user_info: user_info });
  };
  get_page_lectures = async (req, res) => {
    if (!res.locals.user_id) {
      return res.render("admin/index", { ejsName: "manage-lecture", user_info: false });
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("admin/index", { ejsName: "manage-lecture", user_info: user_info });
  };
  get_page_add_lecture = async (req, res) => {
    if (!res.locals.user_id) {
      return res.render("admin/index", { ejsName: "add-lecture", user_info: false });
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("admin/index", { ejsName: "add-lecture", user_info: user_info });
  };
  
  get_page_update_lecture = async (req, res) => {
    const lecture_id = req.params.lecture_id;
    const lecture_detail = await this.adminservice.get_detail_lecture(
      lecture_id
    );

    if (!res.locals.user_id) {
      return res.render("admin/index", { ejsName: "update-lecture", user_info: false, lecture: lecture_detail });
    }
    const user_info = await this.authService.get_user_by_id(res.locals.user_id);
    res.render("admin/index", { ejsName: "update-lecture", user_info: user_info, lecture: lecture_detail });
  };
  
}

// api 용
class AdminControllerApi {
  adminservice = new AdminService();

  // 관리자 유저 조회
  get_user_info = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await this.adminservice.get_user_info(email);

      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
    }
  };

  // 관리자 권한 부여
  add_admin_user = async (req, res) => {
    const user_id = req.params.user_id;
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

  // 강의 상세 조회

  // 강의 수정
  update_lecture = async (req, res) => {
    // 수정 할 field
    const { lecture_id } = req.params;
    const { lecturer, title, content, category, image, point } = req.body;
    // 유저 타입 가져오기 예시
    try {
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
    try {
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
    const { lecturer, title, content, category, point } = req.body;
    try {
      const new_lecture = await this.adminservice.regist_lecture(
        lecturer,
        title,
        content,
        category,
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
