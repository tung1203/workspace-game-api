const mongoose = require("mongoose");

module.exports = mongoose.model(
  "campaign",
  {
    name: String,
    email: String,
    googleAnalytics: {
      trackingId: String,
      viewId: String,
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
  "campaign"
);
