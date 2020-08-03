module.exports = /* GraphQL */ `
  type googleAnalytics {
    trackingId: String
    viewId: String
    isActive: Boolean
  }
  type PageGa {
    pageviews: Int
    users: Int
    newUsers: Int
    sessions: Int
    avgSessionDuration: String
    bounceRate: String
  }
  type getGaTrafficByDay {
    date: String
    numberOfUser: Int
  }
  type getSources {
    sourceMedium: String
    users: Int
    newUsers: Int
    sessions: Int
    bounceRate: String
    pageviewsPerSession: String
    avgSessionDuration: String
  }
  type Campaign {
    _id: String
    name: String
    email: String
    googleAnalytics: googleAnalytics
    createdAt: String
    expiredAt: String
  }
  type Pagination {
    listCampaign: [Campaign]
    totalCampaign: Int
  }
  type ReportEvent {
    totalsForAllResults: Int
    events: [[String]]
  }
  type Query {
    getListCampaign(page: Int, query: String): Pagination
    getReports(campaignId: String): ReportEvent
    getGaTraffic(campaignId: String): PageGa
    getGaTrafficByDay(campaignId: String, startDate: String, endDate: String): [getGaTrafficByDay]
    getSources(campaignId: String): [getSources]
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
