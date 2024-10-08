const createUserService = require("../../services/createuserService");
const { idValidation } = require("../../validation/userDetailsValidation");

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;

    
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

    const isIdExist = await createUserService.getUserByObjectId(id);
    if (!isIdExist) {
      return res.status(404).json({
        status: "FAILED",
        message: "User with the given id does not exist",
      });
    }

    const user = await createUserService.deleteUserById(id);
    if (user.deletedCount > 0) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "User Deleted Successfully",
      });
    } else {
      return res.status(200).json({
        status: "FAILED",
        message: "Failed To Delete User",
      });
    }
  } catch (error) {
    return res.status(200).json({
        status: "FAILED",
        message: error.message,
      });
  }
};

module.exports = deleteUserById;
