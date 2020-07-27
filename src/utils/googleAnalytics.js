const path = require("path");
const { google } = require("googleapis");

module.exports = analytics = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../../oauth2.keys.json"),
    scopes: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics.edit",
      "https://www.googleapis.com/auth/analytics.manage.users",
    ],
  });
  google.options({
    auth: auth,
  });

  return google.analytics("v3");
};
