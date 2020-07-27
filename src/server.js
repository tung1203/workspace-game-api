require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { google } = require("googleapis");
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
  app.get("/test", (req, res) => {
    console.log(path.join(__dirname, "../oauth2.keys.json"));
    res.send("ok");
  });
  app.get("/abc", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "../oauth2.keys.json"),

      scopes: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics.edit",
        "https://www.googleapis.com/auth/analytics.manage.users",
      ],
    });
    google.options({
      auth: auth,
    });

    const analytics = google.analytics("v3");
    const trackingId = await analytics.management.webproperties.insert({
      accountId: "158530582",
      resource: {
        name: "test",
      },
    });
    res.send(list);
  });

  app.use("/api", api);
  require("./graph/workspace")(api);
  require("./graph/campaign")(api);

  app.use("/leaderboard", leaderboard);
  app.listen(8080, () => {
    console.log("server is running");
  });
};
main();
