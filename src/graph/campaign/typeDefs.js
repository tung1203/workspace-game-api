module.exports = /* GraphQL */ `
  type Campaign {
    name: String
    email: String
    createdAt: String
    expiredAt: String
  }
  type Pagination {
    listCampaign: [Campaign]
    totalCampaign: Int
  }
  type Query {
    getListCampaign(page: Int, query: String): Pagination
  }
  type Mutation {
    createCampaign(name: String, email: String): Campaign
  }
`;
