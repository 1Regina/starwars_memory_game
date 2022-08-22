const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const port = 8001;

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

const baseRoute = require("./routes/base");

app.use(express.static(path.join(__dirname, "public")));
const envFilePath = ".env";
dotenv.config({ path: path.normalize(envFilePath) });

app.use("/api", baseRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
