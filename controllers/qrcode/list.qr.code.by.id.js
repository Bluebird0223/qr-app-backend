const qrService = require("../../services/qr.service");

const getQrByUserId = async (request, response) => {
    try {

        console.log(request.body)

        let id = '670272cd7e1d3bef4850ee0b'

        // Check if the user exists with the given ID
        const qrList = await qrService.getActiveQr(id);

        // If QR list is found, return the data
        if (qrList.length > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User's active QR codes retrieved successfully.",
                qrList,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No active QR codes found for this user.",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "SERVER ERROR",
            message: error.message,
        });
    }
};

module.exports = getQrByUserId;
