const createDepartment = require("../controllers/department/create.department");
const getDepartmentList = require("../controllers/department/list.department");

const departmentRoutes = require("express").Router();

departmentRoutes.post("/create-department", createDepartment);
departmentRoutes.post("/list-department", getDepartmentList);

module.exports = departmentRoutes;
