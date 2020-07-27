require("dotenv").config();
const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;
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
router.post("/", (req, res, next) => {
  // const { name ,email ,phone } = req.body;
  const token = req.headers["x-access-token"];
  const user = jwt.verify(token, SECRET);
  req.user = user;
});

module.exports = router;
