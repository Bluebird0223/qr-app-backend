const createQrCode = require("../controllers/qrcode/create.qr.code");
const getQrByUserId = require("../controllers/qrcode/list.qr.code.by.id");
const scannedQr = require("../controllers/scanned-code/store.scanned.code");

const qrRoutes = require("express").Router();

qrRoutes.post("/create-qr", createQrCode);
qrRoutes.post("/scan-qr", scannedQr);
qrRoutes.get("/qr-list", getQrByUserId);

module.exports = qrRoutes;
