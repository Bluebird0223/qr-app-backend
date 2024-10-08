const { ObjectId } = require("mongodb");
const QrCode = require("../models/qr.code.model");
const ScannedCode = require("../models/scanned.code.model");
const { object } = require("joi");

const qrService = {
    createQr: async (dataToInsert) => {
        try {
            return await ScannedCode.create(dataToInsert);
        } catch (error) {
            throw error;
        }
    },
    getActiveQr: async (id = '') => {
        try {
            return await ScannedCode.find({ scannedBy: { $in: new ObjectId(id) }, isActive: true }).sort({ createdAt: -1 });
        } catch (error) {
            throw error;
        }
    },
};

module.exports = qrService;
