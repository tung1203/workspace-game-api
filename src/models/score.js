const mongoose = require("mongoose");

module.exports = mongoose.model(
  "score",
  {
    campaignId: String,
    email: {
      type: String,
      ref: "user",
    },
    score: Number,
    time: {
      type: Date,
      default: Date.now,
    },
  },
  "score"
);
