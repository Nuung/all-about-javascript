const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Node Socket" });
});


// ========================================================= //
// 모든 사용자들간 채팅하기
// ========================================================= //
router.get("/chat", function (req, res, next) {
  res.render("chat", { title: "Node Socket" });
});


// ========================================================= //
// 채팅방(채널) 기반 사용자간 채팅하기
// ========================================================= //
router.get("/groupchat", function (req, res, next) {
  res.render("groupchat", { title: "Node Socket" });
});


module.exports = router;
