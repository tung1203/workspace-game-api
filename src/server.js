const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const main = async () => {
  const api = express.Router();
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.get("/", (req, res) => {
    res.send("working...");
  });

  app.use("/api", api);

  require("./graph/workspace")(api);
  require("./graph/campaign")(api);

  app.listen(8080, () => {
    console.log("server is running");
  });
};
main();
