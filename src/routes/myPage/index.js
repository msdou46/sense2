"use strict";

const express = require("express");
const router = express.Router();

const {
  MypageControllerRender,
} = require("../../layer/controllers/mypage.controller");
const mypageControllerRender = new MypageControllerRender();

// 검증 미들웨어
const mypage_middleware = require("../../middleware/mypage-page-middleware");

// 통합 마이페이지
router.get("/", mypage_middleware,mypageControllerRender.get_page_mypage);
// 마이 페이지 장바구니
router.get("/cart", mypage_middleware, mypageControllerRender.get_page_my_cart);
// 마이 페이지 내 강의실
router.get("/mylecture", mypage_middleware, mypageControllerRender.get_page_my_lectures);

module.exports = router;
