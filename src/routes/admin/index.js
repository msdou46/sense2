"use strict";

const express = require('express');
const router = express.Router();

const { AdminControllerRender } = require("../../layer/controllers/admin.controller");
const adminControllerRender = new AdminControllerRender();

// 관리자 통합 메인 페이지 - 회원관리(관리자 등록)
router.get("/user", adminControllerRender.get_page_admin_user);
// 관리자 페이지 - 상품관리 - 강의 관리
router.get("/lectures", adminControllerRender.get_page_lectures);
// 관리자 페이지 - 상품관리 - 강의 등록
router.get("/lecture/add", adminControllerRender.get_page_add_lecture);


module.exports = router;