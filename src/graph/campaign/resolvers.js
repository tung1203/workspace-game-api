const campaignServices = require("../../services/campaign");

module.exports = {
  Query: {
    getListCampaign: async (_, { page, query }) => {
      return await campaignServices.getListCampaign(page, query);
    },
  },
  Mutation: {
    createCampaign: async (_, { name, email, createdAt, expiredAt }) => {
      return await campaignServices.createCampaign(
        name,
        email,
        createdAt,
        expiredAt
      );
    },

    createTrackingId: (_, { campaignId, campaignName }) =>
      campaignServices.createTrackingId(campaignId, campaignName),

    enableTracking: (_, { campaignId }) => {
      return campaignServices.enableTracking(campaignId);
    },
  },
};
