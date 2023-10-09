// usage : to sign the JWT tokens
const jwt = require("jsonwebtoken");

const JWT_SEC = process.env.JWT_SEC;
const JWT_EXP = process.env.JWT_EXP;

const genJWTToken = (payload, type = null) => {
  try {
    const token = jwt.sign(payload, JWT_SEC, {
      expiresIn: JWT_EXP
    });

    return token;
  } catch (error) {
    console.log(error);
    throw new Error("Error generating JWT token");
  }
};

const verifyJWTToken = token => {
  try {
    const payload = jwt.verify(token, JWT_SEC);
    return payload;
  } catch (error) {
    throw error;
  }
};

module.exports = { genJWTToken, verifyJWTToken };
