// const { isValidObjectId } = require("mongoose");
const createUserService = require("../../services/createuserService");
const { idValidation } = require("../../validation/userDetailsValidation");

const getuserById = async (req, res) => {
  try {
    const { id } = req.body;
  

    // Check if the ID is a valid MongoDB ObjectId
    const { error } = idValidation.validate(
      {
        id,
      },
      { abortEarly: true }
    );

    if (error) {
      return res.status(403).json({
        status: "VALIDATION FAILED",
        message: error.details[0].message,
      });
    }

    // Check if the user exists with the given ID
    const user = await createUserService.getUserByObjectId(id);
    console.log(id);

    // If user exists, return the user data
    if (user) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "User Details",
        data: user,
      });
    } else {
      return res.status(200).json({
        status: "FAILED",
        message: "Failed To Delete User",
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: "SERVER ERROR",
      message: error.message,
    });
  }
};

module.exports = getuserById;
