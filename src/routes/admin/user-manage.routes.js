"use strict";
const express = require("express");
const router = express.Router();

const {
  AdminControllerApi,
} = require("../../layer/controllers/admin.controller");
const adminControllerApi = new AdminControllerApi();

// 관리자가 유저 정보 검색
router.post("/userinfo", adminControllerApi.get_user_info);

// 관리자가 추가로 기존의 유저를 새로운 관리자로 등록시키는 api
router.put("/register/:user_id", adminControllerApi.add_admin_user);

module.exports = router;
