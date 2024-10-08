const mongoose = require("mongoose");

const ScannedCodeModel = new mongoose.Schema({
    qrId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    scannedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    isActive: {
        type: Boolean,
        required: false,
        default: true
    }
}, { timestamps: true });


const ScannedCode = mongoose.model("ScannedCode", ScannedCodeModel);

module.exports = ScannedCode;
