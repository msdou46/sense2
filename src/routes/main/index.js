"use strict";

const express = require("express");
const router = express.Router();

const {
  MainControllerRender,
} = require("../../layer/controllers/main.controller");
const mainControllerRender = new MainControllerRender();

// 첫 메인 페이지
router.get("/", mainControllerRender.get_page_main);
// 메인 페이지에서 강의 클릭 시 상세 페이지로
router.get("/lecture", mainControllerRender.get_page_lecture_detail);

module.exports = router;
