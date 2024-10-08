const { userDetailsValidation } = require("../../validation/userDetailsValidation");
const createUserService = require("../../services/createuserService");

const updateUser = async (req, res) => {
  try {
    const {
        id,
      department,
      designation,
      firstName,
      lastName,
      gender,
      dob,
      aadharCard,
      city,
      address,
    } = req.body;

    const { error } = userDetailsValidation.validate(
      {
        id,
        department,
        designation,
        firstName,
        lastName,
        gender,
        dob,
        aadharCard,
        city,
        address,
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
    const isAadharCardExist = await createUserService.isAadharCardAlredyExist(aadharCard);
    if (!isAadharCardExist) {
      return res.status(404).json({
        status: "FAILED",
        message: "User with the given AadharCard does not exist",
      });
    }
    const dataToInsert = {
      department,
      designation,
      firstName,
      lastName,
      gender,
      dob,
      aadharCard,
      city,
      address,
    };

    const updateUser = await createUserService.updateExistingUser(dataToInsert);

    if (updateUser) {
      return res.status(200).json({
        status: "SUCCESS",
        message: "User Update Successfully!",
      });
    } else {
      return res.status(400).json({
        status: "FAILED",
        message: "Failed to Update user!",
      });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error",
    });
  }
};

module.exports = updateUser;
