"use strict";

const express = require('express');
const router = express.Router();

const { MypageControllerApi } = require("../../layer/controllers/mypage.controller");
const mypageControllerApi = new MypageControllerApi();

// 장바구니 목록 가져오기
router.get("/carts", mypageControllerApi.get_cart_list);

// 장바구니에 담기
router.post("/:lecture_id", mypageControllerApi.add_cart);

// 장바구니에 담겨 있는 강의를 수강하기
router.delete("/sign/:cart_id", mypageControllerApi.sign_cart);

// 장바구니에서 강의 삭제하기
router.delete("/:cart_id", mypageControllerApi.remove_cart);



module.exports = router;