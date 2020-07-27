module.exports = /* GraphQL */ `
  type googleAnalytics {
    trackingId: String
    isActive: Boolean
  }
  type Campaign {
    _id: String
    name: String
    email: String
    googleAnalytics: googleAnalytics
    createdAt: String
    expiredAt: String
    workspaceName: String
  }
  type Pagination {
    listCampaign: [Campaign]
    totalCampaign: Int
  }
  type Query {
    getListCampaign(page: Int, query: String): Pagination
  }
  type Mutation {
    createCampaign(
      name: String
      email: String
      createdAt: String
      expiredAt: String
    ): Campaign
    enableTracking(campaignId: String, campaignName: String): String
    # enableTracking(campaignId: String): Boolean
  }
`;
