const express = require("express");
const router = express.Router();

// render 페이지 랜더링
const main_render_router = require("./main");
const auth_render_router = require("./auth");
const mypage_render_router = require("./myPage");
const admin_render_router = require("./admin");

// main 에서 강의 목록 가져오기 라우터
const main_lecture_list_router = require("./main/main-lecture-list.routes");

// 회원가입 및 로그인 라우터
const register_router = require("./auth/register.routes");
const login_router = require("./auth/login.routes");

// mypage 프로필 가져오기 및 수정, 장바구니 담기/목록/수강/취소, 내 강의목록 불러오기 라우터
const my_profile_router = require("./myPage/my-profile.routes");
const my_cart_router = require("./myPage/my-cart.routes");
const my_lectures_router = require("./myPage/my-lectures.routes");

// 관리자 페이지 회원 관리, 상품 관리 라우터
const admin_user_manage_router = require("./admin/user-manage.routes");
const admin_lecture_manage_router = require("./admin/lecture-manage.routes");

// ejs 랜더링 라우터
router.use("/", main_render_router);
router.use("/auth", auth_render_router);
router.use("/myPage", mypage_render_router);
router.use("/admin", admin_render_router);

// api 라우트
router.use("/api/lectures", main_lecture_list_router);

router.use("/api/register", register_router);
router.use("/api/login", login_router);

router.use("/api/profile", my_profile_router);
router.use("/api/cart", my_cart_router);
router.use("/api/mylectures", my_lectures_router);

router.use("/api/admin/user", admin_user_manage_router);
router.use("/api/admin/lecture", admin_lecture_manage_router);

module.exports = router;
