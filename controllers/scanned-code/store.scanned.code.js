const qrService = require("../../services/qr.service");
const userService = require("../../services/user.service");
const { qrDetailsValidation } = require("../../utils/validation/qrDetailsValidation");


const scannedQr = async (request, response) => {
    try {
        const { _id } = request
        const { qrId, productName } = request.body;

        // check validation
        // const validationResult = await qrDetailsValidation.validate({ qrId, productName }, { abortEarly: true })
        // if (validationResult?.error) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: validationResult?.error?.details[0]?.message
        //     })
        // }

        // check user exist
        // const isUserExist = await userService.getUserByObjectId(_id)
        // if (isUserExist) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: `${isUserExist?.name} is not exist`
        //     })
        // }


        // check already scanned by user 
        // const isQrScanned = await qrService.getQrDetails()
        // if (isQrScanned?.scannedBy?.includes(_id)) {
        //     return response.status(200).json({
        //         status: "FAILED",
        //         message: `${isQrScanned?.productName} is already scanned`
        //     })
        // }

        const dataToInsert = {
            qrId,
            productName,
            scannedBy: '670272cd7e1d3bef4850ee0b'
        };

        // insert data into db & send response to client
        const scanQr = await qrService.scanQr(dataToInsert);
        if (scanQr._id) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Scanned code Successfully!",
            });
        } else {
            return response.status(400).json({
                status: "FAILED",
                message: "Failed to Scan code!",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "ERROR",
            message: error.message
        });
    }
};

module.exports = scannedQr;
