require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const leaderboard = require("./routes/leaderboard");

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
  require("./features/workspace/graphql")(api);
  require("./features/campaign/graphql")(api);

  app.use("/leaderboard", leaderboard);
  app.listen(8080, () => {
    console.log("server is running");
  });
};
main();
