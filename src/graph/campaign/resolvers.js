const campaignServices = require("../../services/campaign");

module.exports = {
  Query: {
    getListCampaign: async (_, { page, query }) => {
      return await campaignServices.getListCampaign(page, query);
    },
  },
  Mutation: {
    createCampaign: async (_, { name, email }) => {
      return await campaignServices.createCampaign(name, email);
    },
  },
};
