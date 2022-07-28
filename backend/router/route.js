const express = require("express");
const company = require("../controller/company_controller");
const router = express.Router();

router.post("/getCompaniesByName", company);
module.exports = router;
