const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/signup", signup); // or /api/auth + /signup = /api/auth/signup
router.post("/login", login); // or /api/auth + /login = /api/auth/login

module.exports = router;
