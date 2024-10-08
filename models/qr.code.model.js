const mongoose = require("mongoose");

const QrCodeModel = new mongoose.Schema({
    qrId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    }
}, { timestamps: true });


const QrCode = mongoose.model("QrCode", QrCodeModel);

module.exports = QrCode;
