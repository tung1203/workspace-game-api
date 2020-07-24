require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { google } = require("googleapis");

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

  app.get("/google", (req, res) => {
    const analytics = google.analytics("v3");
    analytics.data.ga.get(
      {
        auth: "AIzaSyAY71EFmJVdMDWllwQxYj5UsiJJFzksInE",
        ids: "ga:224456364",
        metrics: "ga:sessions,ga:bounces",
        "start-date": "30daysAgo",
        "end-date": "today",
      },
      function (err, response) {
        if (err) {
          console.log(err);
          return err;
        }
        return res.send(response.data);
      }
    );
  });

  app.use("/api", api);

  require("./graph/workspace")(api);
  require("./graph/campaign")(api);

  app.listen(8080, () => {
    console.log("server is running");
  });
};
main();
