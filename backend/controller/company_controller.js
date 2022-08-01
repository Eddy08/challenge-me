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
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
  }
};
module.exports = details;
