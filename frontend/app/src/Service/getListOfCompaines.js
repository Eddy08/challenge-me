let axios = require("axios");

export function getListOfCompanies() {
  // let requestOptions = {
  //   method: "POST",
  //   redirect: "follow",
  // };

  // return fetch("localhost:4000/getAllCompanies", requestOptions).then((response) => response.text())

  let config = {
    method: "post",
    url: "/getAllCompanies",
  };

  return axios(config);
}
