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

    on_record: req.body.company_id.toString().includes("***") ? false : true,
  };
  //  Save if not present
  CompanyModel.findOrCreate({
    where: { company_name: CompanyObj.company_name },
  }).then(([obj, created]) => {
    // console.log("Object Recieved", obj);
    if (created) {
      CompanyModel.update(
        { company_id: CompanyObj.company_id, on_record: CompanyObj.on_record },
        { where: { company_name: CompanyObj.company_name } }
      ).then((value) => console.log(value));
      res.send("Company " + obj.company_name + " Stored Successfully ✅");
    } else {
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

exports.readAll = (req, res) => {
  console.log("Inside ReadAll Data method");
  let data;
  if (!req.body) {
    data = CompanyModel.findAll({  order: [[db.Sequelize.literal('"updatedAt"'), 'DESC']]});
  } else {
    data = CompanyModel.findAll({  order: [[db.Sequelize.literal('"updatedAt"'), 'DESC']]});
  }
  data
    .then((data) => {
      // let sortedData=data.sort((a, b) => new Date(a.updatedAt) < new Date(b.updatedAt))
      // console.log("sorted Data ",sortedData)
      // console.log("unsorted data",data)
      res.send(
        data
      );
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
