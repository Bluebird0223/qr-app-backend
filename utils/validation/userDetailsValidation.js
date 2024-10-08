const Joi = require("joi");

exports.userDetailsValidation = Joi.object().keys({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  city: Joi.string().required(),
  mobile: Joi.string().required()
});
exports.idValidation = Joi.object().keys({
  id: Joi.string().required().length(24)
})

//validation for login
exports.loginValidationSchema = Joi.object().keys({
  userId: Joi.string().required(),
  password: Joi.string().required(),
});