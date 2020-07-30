module.exports = /* GraphQL */ `
  type googleAnalytics {
    trackingId: String
    viewId: String
    isActive: Boolean
  }
  type PageGa {
    pagePath: String
    pageviews: String
    uniquePageviews: String
    avgTimeOnPage: String
    entrances: String
    bounceRate: String
    exitRate: String
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
  type ReportEvent{
    totalsForAllResults: Int
    events: [[String]]
  }
  type Query {
    getListCampaign(page: Int, query: String): Pagination
    getReports(campaignId: String): ReportEvent
    getGaTraffic(campaignId: String): [PageGa]
  }
  type Mutation {
    createCampaign(
      name: String
      email: String
      createdAt: String
      expiredAt: String
    ): Campaign
    enableTracking(campaignId: String, campaignName: String): String
  }
`;
