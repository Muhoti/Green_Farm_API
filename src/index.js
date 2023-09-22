require("dotenv").config();
const express = require("express");
const app = express();
const env = require("./configs/env");
const Auth = require("./libs/Auth/Auth.route");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
