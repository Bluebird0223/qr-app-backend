const Joi = require("joi");

exports.qrDetailsValidation = Joi.object().keys({
    qrId: Joi.string().required(),
    productName: Joi.string().required(),
});
