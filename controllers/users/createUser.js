
const userService = require('../../services/user.service');
const { userDetailsValidation } = require('../../utils/validation/userDetailsValidation')
const createUser = async (request, response) => {
  try {
    const { name, gender, city, mobile } = request.body;

    const { error } = userDetailsValidation.validate({ name, gender, city, mobile }, { abortEarly: true });
    if (error) {
      return response.status(200).json({
        status: "VALIDATION FAILED",
        message: error.details[0].message,
      });
    }

    // check admin already exits or not
    const isAdminExist = await userService.getUserByName(name?.toLowerCase())
    if (isAdminExist) {
      return response.status(200).json({
        status: "FAILED",
        message: `${name} is already exist`
      })
    }

    let userId;
    //get all users for userId
    const users = await userService.getLatestCreatedRecord();
    if (users.length > 0) {
      const lastUserUserId = (Number(users[0].userId.substring(3)) + 1);
      userId = `QRSC${lastUserUserId}`
    } else {
      userId = "QRSC1000"
    }

    const dataToInsert = {
      name: name?.toLowerCase(),
      gender,
      city,
      mobile,
      password: mobile.toString(),
      userId,
      isActive: true
    };

    // insert data into db & send response to client
    const createdUser = await userService.createUser(dataToInsert);
    if (createdUser._id) {
      return response.status(200).json({
        status: "SUCCESS",
        message: "User Registered Successfully!",
      });
    } else {
      return response.status(400).json({
        status: "FAILED",
        message: "Failed to register user!",
      });
    }

  } catch (error) {
    return response.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
};

module.exports = createUser;
