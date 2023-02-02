"use strict";

const express = require("express");
const router = express.Router();

const {
  MypageControllerApi,
} = require("../../layer/controllers/mypage.controller");
const mypageControllerApi = new MypageControllerApi();

// 마이 페이지에서 내가 결제한 강의 목록 가져오기
router.get("/", mypageControllerApi.get_my_lectures);


module.exports = router;
