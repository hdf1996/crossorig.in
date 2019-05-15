const express = require("express");
const rollbar = require("rollbar");
const bodyParser = require("body-parser");

const resolver = require("./resolver");
const { REGEX_HTTP } = require("./constants");

const app = express();

if (process.env.ROLLBAR_ACCESS_TOKEN)
  rollbar.init(process.env.ROLLBAR_ACCESS_TOKEN);

app.set("port", process.env.PORT || 5000);

app.use(
  bodyParser.raw({
    inflate: true
  })
);

app.use((req, res, next) => {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", chunk => (req.rawBody += chunk));

  req.on("end", next);
});

app.all(REGEX_HTTP, resolver);

app.use(express.static("public"));

const listen = () =>
  app.listen(app.get("port"), () =>
    console.log(`Crossorig.in on port ${app.get("port")}`)
  );

module.exports = { listen };
