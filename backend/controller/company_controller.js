const axios = require("axios");

const details = async (req, res) => {
  //   console.log(JSON.stringify(req));
  //   str = JSON.stringify(req.body);
  let body = new URLSearchParams(req.body).toString();
  console.log(body);
  try {
    let config = {
      method: "post",
      url: "https://www.zaubacorp.com/custom-search",
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Origin: "https://www.zaubacorp.com",
        DNT: "1",
        Connection: "keep-alive",
        Referer: "https://www.zaubacorp.com/",
        Cookie: "drupal.samesite=1",
      },
      data: body,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        let result = response.data.replaceAll("\t", "").replaceAll("\n", "");
        let data = [];
        divTagList = result.split("</div>");
        const regex = /<div class="show" align="left" id="(.*)">(.*)/gm;

        for (let i = 0; i < divTagList.length; i++) {
          // let el = divTagList[i].replaceAll("/div.*id/", "");
          // data.push(el);
          console.log("list");
          console.log(divTagList[i].trim());
          console.log("list");

          for (const match of divTagList[i].trim().matchAll(regex)) {
            console.log(`Hello ${match[1]} ${match[2]}`);
            let map = {};
            map["company_name"] = `${match[2]}`;
            map["company_id"] = `${match[1]}`;

            data.push(map);
          }
        }
        console.log("\n Real Result \n ==> ", data);
        res.send(JSON.stringify(data));
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // let err = {};
          // err.data = error.response.data;
          // err.status = error.response.status;
          // err.headers = error.response.headers;
          // res.send(err);
          // console.log(err);
          console.log("error1 -> ", error);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // let err = {};
          // err.request = error.request;
          // console.log(err);
          // res.send(err);
          console.log("error2 -> ", error);
          res.send('[]')
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log("Error", error.message);
          // let err = {};
          // err.message = error.message;
          console.log("error3 -> ", error);
        }
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports = details;
