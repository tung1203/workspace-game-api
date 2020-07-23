const CampaignModel = require("../models/campaign");
const escapeRegex = require("../utils/regex-escape");

module.exports = {
  createCampaign: (name, email) => CampaignModel.create({ name, email }),

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
      .limit(pageSize);
    totalCampaign = await CampaignModel.countDocuments(searchName);
    return { listCampaign, totalCampaign };
  },
};
