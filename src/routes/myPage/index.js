"use strict";

const express = require("express");
const router = express.Router();

const {
  MypageControllerRender,
} = require("../../layer/controllers/mypage.controller");
const mypageControllerRender = new MypageControllerRender();

// 통합 마이페이지
router.get("/", mypageControllerRender.get_page_mypage);
// 마이 페이지 장바구니
router.get("/cart", mypageControllerRender.get_page_my_cart);
// 마이 페이지 내 강의실
router.get("/mylecture", mypageControllerRender.get_page_my_lectures);

module.exports = router;
