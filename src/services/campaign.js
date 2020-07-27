const CampaignModel = require("../models/campaign");
const WorkspaceModel = require("../models/workspace");
const escapeRegex = require("../utils/regex-escape");
const analytics = require("../utils/googleAnalytics");

module.exports = {
  createCampaign: (name, email, createdAt, expiredAt) =>
    CampaignModel.create({ name, email, createdAt, expiredAt }),

  getListCampaign: async (page = 1, query) => {
    const pageSize = 3;
    page = page > 0 ? page : 1;
    let listCampaign, totalCampaign;

    let searchName = {};
    if (query) {
      name = new RegExp(escapeRegex(query), "gi");
      searchName = {
        name: name,
      };
    }
    listCampaign = await CampaignModel.find(searchName)
      .sort({ createdAt: -1 })
      .skip(pageSize * page - pageSize)
      .limit(pageSize)
      .lean();

    await Promise.all(
      listCampaign.map(async (campaign) => {
        const workspace = await WorkspaceModel.findOne({
          email: campaign.email,
        }).lean();
        if (workspace) {
          if (campaign.email === workspace.email) {
            campaign.workspaceName = workspace.name;
          }
        }
      })
    );
    totalCampaign = await CampaignModel.countDocuments(searchName);
    return { listCampaign, totalCampaign };
  },

  enableTracking: async (campaignId, campaignName) => {
    const trackingId = await analytics().management.webproperties.insert({
      accountId: "158530582",
      resource: {
        name: campaignName,
      },
    });
    const view = await analytics().management.profiles.insert({
      accountId: "158530582",
      webPropertyId: trackingId.data.id,
      resource: {
        name: campaignName,
      },
    });
    console.log(trackingId);
    console.log(view);
    await CampaignModel.findOneAndUpdate(
      { _id: campaignId },
      { $set: { "googleAnalytics.trackingId": trackingId.data.id } }
    );
    return trackingId.data.id;
  },

  // enableTracking: async (campaignId) => {
  //   const campaign = await CampaignModel.findById({ _id: campaignId }).lean();
  //   console.log(!campaign.googleAnalytics.trackingId);
  //   if (campaign && !campaign.googleAnalytics.trackingId) {
  //     const view = await analytics().management.profiles.insert({
  //       accountId: "158530582",
  //       webPropertyId: campaign.googleAnalytics.trackingId,
  //       resource: {
  //         name: campaign.name,
  //       },
  //     });
  //     console.log(view);
  //     return true;
  //   }
  // },
};
