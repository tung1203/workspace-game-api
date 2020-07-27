const mongoose = require("mongoose");

module.exports = mongoose.model(
  "leaderboard",
  {
    name: String,
    email: String,
    googleAnalytics: {
      trackingId: String,
      isActive: false,
    },
    // trackingId: {
    //   type: String,
    //   default: null,
    // },
    createdAt: {
      type: Number,
      default: Date.now,
    },
    expiredAt: {
      type: Number,
      default: null,
    },
  },
  "leaderboard"
);
