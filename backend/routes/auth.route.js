const express = require("express");
const USER_TYPES = require("../utils/constants");
const { Login, Register, Logout } = require("../controllers/auth.controller");
const router = express.Router();

router.route("/login").post(Login);
router.route("/register").post(Register);
router.route("/logout").post(Logout);

module.exports = router;
