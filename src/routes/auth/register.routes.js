const express = require('express');
const router = express.Router();

const { AuthControllerApi } = require("../../layer/controllers/auth.controller");
const authControllerApi = new AuthControllerApi();

// 회원가입 시 사용자 입력 정보 받아와서 처리하기
router.post("/", authControllerApi.user_register);

module.exports = router;