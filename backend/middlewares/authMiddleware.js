const { verifyJWTToken } = require("../services/jwt.service");
const User = require("../models/user.model");
const Guest = require("../models/guestUser.model");
const USER_TYPES = require("../utils/constants.js");

module.exports = userType => {
  return async (req, res, next) => {
    const token = req.cookies.token;

    // console.log(token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "TokenExpiredError",
        specialMessage: "Not Authorized. Token not found !!!"
      });
    }

    try {
      const { _id } = verifyJWTToken(token);

      try {
        let user;
        if (userType === USER_TYPES.admin) {
          user = await User.findById(_id);
        } else if (userType == USER_TYPES.guest) {
          user = await Guest.findById(_id);
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            // message: "TokenExpiredError",
            message: "User not found."
          });
        }

        req.user = user;
        next();
      } catch (error) {
        console.log(error);
        return res
          .status(401)
          .json({ success: false, message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
      if (error.name == "TokenExpiredError") {
        return res
          .clearCookie("token")
          .status(401)
          .json({ success: false, message: error.message });
      } else {
        return res.status(401).json({ success: false, message: error.message });
      }
    }
  };
};
