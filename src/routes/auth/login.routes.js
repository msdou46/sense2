const express = require("express");
const router = express.Router();

const {
  AuthControllerApi,
} = require("../../layer/controllers/auth.controller");
const authControllerApi = new AuthControllerApi();

// 유저 로그인
router.post("/", authControllerApi.user_login);

// 유저 로그 아웃
router.get("/", authControllerApi.user_logout);

module.exports = router;
