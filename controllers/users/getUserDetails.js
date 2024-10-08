const uerService = require("../../services/user.service");

const getUserDetails = async (request, response) => {
  try {

    //get data from db & send response to client
    const user = await uerService.getUserDetailsList();
    if (user?.length > 0) {
      return response.status(200).json({
        status: "SUCCESS",
        message: "user list fetched successfully",
        user,
      });
    } else {
      return response.status(200).json({
        status: "FAILED",
        message: "user not available",
      });
    }
  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = getUserDetails;
