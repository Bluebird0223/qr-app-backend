const routes = require("express").Router();
const qrRoutes = require("./qrRoutes.routes");
const userRoutes = require("./userRoutes.routes");

routes.use("/user", userRoutes);
routes.use('/qr',qrRoutes)

module.exports = routes;
