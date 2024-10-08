const createUser = require("../controllers/users/createUser");
const getUserDetails = require("../controllers/users/getUserDetails");
const login = require("../controllers/users/login");
const authenticateUserJWT = require("../utils/middleware/auth");
// const getUserDetails = require("../controllers/users/getUserDetails");
// const deleteUserById = require("../controllers/users/deleteUserById");
// const getuserById = require("../controllers/users/getUserById");
// const updateUser = require("../controllers/users/updateUser");
const userRoutes = require("express").Router();

userRoutes.post("/create-user", createUser);
userRoutes.post('/login', login)
userRoutes.get('/user-detail-list', authenticateUserJWT, getUserDetails)
// userRoutes.post("/user-detail-list", getUserDetails);
// userRoutes.post("/delete-user", deleteUserById);
// userRoutes.post("/user-detail-by-id", getuserById);
// userRoutes.post("/update-user", updateUser);
// userRoutes.post("/reset-password", resetPassword);


module.exports = userRoutes;
