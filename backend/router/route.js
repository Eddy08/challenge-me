const express = require("express");
const company = require("../controller/company_controller");
const createCompany =require("../controller/data_store_controller").create
const getAllCompanyDetails=require("../controller/data_store_controller").readAll
const router = express.Router();

router.post("/getCompaniesByName", company);
router.post("/createCompany",createCompany)
router.post("/getAllCompanies",getAllCompanyDetails)
module.exports = router;
