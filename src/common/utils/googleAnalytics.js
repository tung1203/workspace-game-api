const path = require("path");
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../../oauth2.keys.json"),
  scopes: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics.edit",
    "https://www.googleapis.com/auth/analytics.manage.users",
    "https://www.googleapis.com/auth/analytics",
  ],
});
google.options({
  auth: auth,
});
module.exports = {
  analytics: () => {
    return google.analytics("v3");
  },
  analyticsReporting: () => {
    return google.analyticsreporting("v4");
  },
};
