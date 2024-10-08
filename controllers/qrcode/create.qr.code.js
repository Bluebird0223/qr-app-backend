const qrService = require("../../services/qr.service");
const userService = require("../../services/user.service");
const { qrDetailsValidation } = require("../../utils/validation/qrDetailsValidation");


const createQrCode = async (request, response) => {
    try {
        const { _id } = request
        const { qrId, productName } = request.body;
        console.log(request.body);
        

        // check validation
        const validationResult = await qrDetailsValidation.validate({ qrId, productName }, { abortEarly: true })
        if (validationResult?.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message
            })
        }

        // check user exist
        // const isUserExist = await userService.getUserByObjectId(_id)
        // if (isUserExist) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: `${isUserExist?.name} is not exist`
        //     })
        // }


        // check Qr already created 
        // const isQrExist = await qrService.getQrDetailsByQrId(qrId)
        // if (isQrExist) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: `${isQrExist?.productName} is already Exist`
        //     })
        // }

        const dataToInsert = {
            qrId,
            productName,
            createdBy: '670272cd7e1d3bef4850ee0b'
        };

        console.log(dataToInsert)
        // insert data into db & send response to client
        const createdQr = await qrService.createQr(dataToInsert);
        if (createdQr._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Qr created Successfully!",
            });
        } else {
            return response.status(400).json({
                status: "FAILED",
                message: "Failed to create Qr!",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "ERROR",
            message: error.message
        });
    }
};

module.exports = createQrCode;
