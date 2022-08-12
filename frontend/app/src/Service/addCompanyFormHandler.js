export function addCompanyHandler( suggestions){
    
        console.log("Inside addCompanyHandler");
        let company = {};
        company["company_name"] = document.getElementById("companyName").value;
        console.log(suggestions);
        let id = suggestions.filter(
          (val) => val.company_name === company["company_name"]
        )[0];
        // console.log(id);
        company["company_id"] = id
          ? id.company_id.split("/")[2]
          : Math.floor(Math.random() * Math.pow(10, 36))
              .toString(36)
              .slice(2)
              .toUpperCase() + "***";
        console.log(company);
        return company
}