const express = require("express");
const { uploadFile } = require("../controllers/upload.controller");
const authenticate = require("../middlewares/authMiddleware");
const fileUploaderMiddleware = require("../middlewares/fileUploaderMiddleware");
const USER_TYPES = require("../utils/constants");
const router = express.Router();

router.route("/upload").post(
//   authenticate(USER_TYPES.admin),
  fileUploaderMiddleware("file", 10), //fileType, fieldName, maxCount
  uploadFile
);

module.exports = router;
