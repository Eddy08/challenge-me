const request = require("request");

const details = async (req, res) => {
  //   console.log(JSON.stringify(req));
  //   str = JSON.stringify(req.body);
  let body = new URLSearchParams(req.body).toString();
  console.log(body);
  try {
    let options = {
      method: "POST",
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
      },
      body: req.body,
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = details;
