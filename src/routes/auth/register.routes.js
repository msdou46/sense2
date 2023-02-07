const express = require("express");
const router = express.Router();

const {
  AuthControllerApi,
} = require("../../layer/controllers/auth.controller");
const authControllerApi = new AuthControllerApi();

// 회원가입 시 사용자 입력 정보 받아와서 유효성 및 중복 확인 처리하기. 그 후 이메일 인증 코드 발급
router.post("/", authControllerApi.user_register);

// 이메일 인증 후 가입
router.post("/join", authControllerApi.user_register_insert);

module.exports = router;
