"use strict";

const express = require("express");
const router = express.Router();

const {
  MainControllerRender,
} = require("../../layer/controllers/main.controller");
const mainControllerRender = new MainControllerRender();

// 검증 미들웨어
const mypage_middleware = require("../../middleware/mypage-page-middleware");
const user_info_middleware = require("../../middleware/user-info-main-page.middleware");

// 첫 메인 페이지
router.get("/", user_info_middleware, mainControllerRender.get_page_main);

// 메인 페이지에서 강의 클릭 시 상세 페이지로 
// router.get("/lecture", mypage_middleware, mainControllerRender.get_page_lecture_detail);
router.get("/lecture/:lecture", mypage_middleware, mainControllerRender.get_page_lecture_detail);

module.exports = router;
