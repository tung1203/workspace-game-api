const mongoose = require("mongoose");

module.exports = mongoose.model(
  "workspace",
  {
    name: String,
    email: String,
    password: String,
    createdAt: {
      type: Number,
      default: Date.now,
    },
  },
  "workspace"
);
