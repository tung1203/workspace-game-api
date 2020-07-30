const mongoose = require("mongoose");
const { validate } = require("graphql");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const validatePhone = function (phone) {
  const re = /^\+[0-9]{10,12}$/;
  return re.test(phone);
};

module.exports = mongoose.model(
  "user",
  {
    campaignId: String,
    name: String,
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      required: "Phone number is required",
      validate: [validatePhone, "please fill valid phone number"],
      match: [/^\+[0-9]{10,12}$/, "please fill valid phone number"],
    },
  },
  "user"
);
