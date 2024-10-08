const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;


module.exports = function generateUserJWT(userDetails) {
    return jwt.sign(userDetails, secretKey, { expiresIn: process.env.JWT_EXPIRE_TIME });
}