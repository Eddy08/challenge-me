
module.exports = (sequelize, Sequelize) => {
    const company = sequelize.define("company", {
      company_name: {
        type: Sequelize.STRING
      },
      company_id: {
        type: Sequelize.STRING
      },
      on_record: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return company;
  };