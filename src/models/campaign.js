const mongoose = require("mongoose");

module.exports = mongoose.model(
  "campaign",
  {
    name: String,
    email: String,
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
