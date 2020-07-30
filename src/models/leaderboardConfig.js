const mongoose = require("mongoose");

module.exports = mongoose.model(
  "leaderboardConfig",
  {
    campaignId: {
      type: String,
    },
    descending: {
      type: Boolean,
      default: "desc",
    },
    uniqueField: String,
  },
  "leaderboardConfig"
);
