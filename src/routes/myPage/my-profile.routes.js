"use strict";

const express = require('express');
const router = express.Router();

const { MypageControllerApi } = require("../../layer/controllers/mypage.controller");
const mypageControllerApi = new MypageControllerApi();


// 통합 마이 페이지 접속 시 유저의 프로필 정보 가져오기
router.get("/", mypageControllerApi.get_my_profile);

// 유저가 개인 프로필 수정 시
router.put("/", mypageControllerApi.update_my_profile);



module.exports = router;