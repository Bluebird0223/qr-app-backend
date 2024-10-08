const jwt = require('jsonwebtoken');
const userService = require('../../services/user.service');


const authenticateUserJWT = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userObject) => {
                if (err) {
                    response.status(200).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended. Please login again."
                    });
                    return;
                } else {
                    request._id = userObject._id;
                    const doesUserExist = await userService.getUserByObjectId(userObject?._id);
                    if (!doesUserExist) {
                        response.status(200).json({
                            status: "JWT_INVALID",
                            message: "Your session has ended. Please login again."
                        });
                        return;
                    };
                    request.name = doesUserExist.name;
                    request.userId = doesUserExist?.userId;
                    request.city = doesUserExist?.city;
                    request.mobile = doesUserExist?.mobile;
                    request.gender = doesUserExist?.gender;
                }
                next();
            });
        } else {
            response.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message
        });
        return;
    }
};

module.exports = authenticateUserJWT;