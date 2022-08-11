const express = require("express");
const router = require("./router/route");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.use(router);


app.listen(4000);
