const express = require("express");
const router = express.Router();

const {
  MainControllerApi,
  } = require("../../layer/controllers/main.controller");
  const mainControllerApi = new MainControllerApi();

  // 검증 미들웨어
const mypage_middleware = require("../../middleware/mypage-page-middleware");

// 강의 클릭시 강의 상세 보기
router.get("/:lecture_id", mypage_middleware,mainControllerApi.get_lectures_detail);

// 강의 상세보기에서 수강하기 클릭 시 결제부터
router.post("/payment", mypage_middleware, mainControllerApi.payment_lecture);

// 강의 상세보기에서 수강하기
router.post("/test",mypage_middleware,mainControllerApi.sign_cart);

// 강의 상세보기에서 장바구니 추가하기
router.post("/test2",mypage_middleware,mainControllerApi.add_cart);
module.exports = router;
