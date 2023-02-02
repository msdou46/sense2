"use strict";

const express = require("express");
const router = express.Router();

const {
  AuthControllerRender,
} = require("../../layer/controllers/auth.controller");
const authControllerRender = new AuthControllerRender();

// 통합 로그인 페이지
router.get("/login", authControllerRender.get_page_login);
// 통합 회원가입 페이지
router.get("/register", authControllerRender.get_page_register);

module.exports = router;
