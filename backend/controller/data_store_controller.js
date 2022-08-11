const db = require("../models");
const CompanyModel = db.company;
const op = db.Sequelize.Op;

exports.create = (req, res) => {
  //   console.log("request received", req);
  // validate
  if (!req || !req.body.company_name || !req.body.company_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //  Create Company Object
  const CompanyObj = {
    company_name: req.body.company_name,

    company_id: req.body.company_id,

    on_record: toString(req.body.company_id).includes("***") ? false : true,
  };
  //  Save if not present
  CompanyModel.findOrCreate({
    where: 
      CompanyObj,
    
  }).then(([obj, created]) => {
    // console.log("Object Recieved", obj);
    if (created)
      res.send("Company " + obj.company_name + " Stored Successfully ✅");
    else
    {   
        res.status(500)

        res.send(
            "Company with name " +
            obj.company_name +
            " already Exists with id " +
            obj.company_id
            );
        }
        });
};
