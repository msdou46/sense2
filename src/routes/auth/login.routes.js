const express = require("express");
const router = express.Router();

const {
  AuthControllerApi,
} = require("../../layer/controllers/auth.controller");
const authControllerApi = new AuthControllerApi();

// 유저 로그인
router.post("/", authControllerApi.user_login);

module.exports = router;
