const express = require("express");
const router = express.Router();

const {
  MainControllerApi,
} = require("../../layer/controllers/main.controller");
const mainControllerApi = new MainControllerApi();

// 통합 메인 페이지에서 모든 강의 목록 가져오기
router.get("/", mainControllerApi.get_lectures_list);

module.exports = router;
