const { company } = require("../models");
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
    
            { company_name: CompanyObj.company_name }
        
    }).then(([obj, created]) => {
    // console.log("Object Recieved", obj);
    if (created){
        CompanyModel.update({company_id:CompanyObj.company_id, on_record:CompanyObj.on_record},{where:{company_name:CompanyObj.company_name}}).then(
         (value=>console.log(value))   
        )
        res.send("Company " + obj.company_name + " Stored Successfully ✅");
    }
    else {
      res.status(500);

      res.send(
        "Company with name " +
          obj.company_name +
          " already Exists with id " +
          obj.company_id
      );
    }
  });
};

exports.readAll=(req,res)=>{
  let data;
  if(!req.body){
data=CompanyModel.findAll();
  }
  else{
    data=companyModel.findAll()
  }
  data.then(data=>res.send(data)).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving data."
    });
  });
}