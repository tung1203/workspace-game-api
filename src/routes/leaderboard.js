require("dotenv").config();
const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const url = require("url");
const userModal = require("../models/user");
const leaderboardCongigModal = require("../models/leaderboardConfig");
const scoreModal = require("../models/score");
const campaignModal = require("../models/campaign");
const { db } = require("../models/user");
const SECRET = process.env.SECRET;
const axios = require("axios");
const checkToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send("token not valid!");
  }
};

router.post("/:campaignId/users", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const campaignId = req.params.campaignId;
  try {
    const campaign = await campaignModal.findOne({ _id: campaignId });
    if (!campaign) {
      res.status(500).send("Campaign not found!");
    }
    if (campaign) {
      const { _id } = await userModal.create({
        campaignId,
        name,
        email,
        phone,
      });
      const token = jwt.sign({ _id, name, email, phone }, process.env.SECRET);
      res.status(200).send(token);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
    // res.status(500).send("Campaign not found");
  }
});
router.post("/:campaignId/scores", async (req, res, next) => {
  const { token, score } = req.body;
  const campaignId = req.params.campaignId;
  try {
    campaignModal.findById(req.params.campaignId);
    const userInfo = jwt.verify(token, process.env.SECRET);
    // userInfo[config.uniqueField];
    scoreModal.create({ score, email, campaignId });

    res.status(200).send("success");
  } catch (error) {
    res.status(500).send("Token or campaign not valid");
  }
});

router.get("/:campaignId/scores", async (req, res, next) => {
  const campaignId = req.params.campaignId;
  try {
    const scores = await scoreModal
      .find({ campaignId })
      .sort({ score: -1 })
      .limit(10);
    res.status(200).send(scores);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

router.get("/:campaignId/users", async (req, res, next) => {
  const campaignId = req.params.campaignId;
  try {
    const users = await userModal
      .find({ campaignId })
      .sort({ name: -1 })
      .limit(10);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/:campaignId/leaderboard-on", async (req, res, next) => {
  const campaignId = req.params.campaignId;
  try {
    const leaderboard = await axios.default
      .get("http://localhost:5050/leader-board")
      .then((e) => e.data);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
  res.send(leaderboard);
});

module.exports = router;
