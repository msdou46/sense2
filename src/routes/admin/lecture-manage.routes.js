"use strict";
const express = require("express");
const router = express.Router();

const {
  AdminControllerApi,
} = require("../../layer/controllers/admin.controller");
const adminControllerApi = new AdminControllerApi();

// 관리자가 상품 관리 - 강의 관리 페이지에 접속하면 현재 등록되어 있는 강의 목록을 가져옴
router.get("/lectures", adminControllerApi.get_lectures);

// 상품 관리 - 강의 관리 페이지에서 강의 수정 시
router.put("/:lecture_id", adminControllerApi.update_lecture);

// 상품 관리 - 강의 관리 페이지에서 강의 삭제 시
router.delete("/:lecture_id", adminControllerApi.remove_lecture);

// 상품 관리 - 강의 등록
router.post("/", adminControllerApi.add_lecture);

module.exports = router;
