module.exports = /* GraphQL */ `
  type Workspace {
    id: String
    name: String
    email: String
    createdAt: String
  }
  type Pagination {
    listWorkspace: [Workspace]
    totalWorkspace: Int
  }

  type Query {
    getListWorkspace(page: Int, query: String): Pagination
    getDetailWorkspace(id: String): Workspace
  }

  type Mutation {
    createWorkspace(name: String, email: String): Workspace
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
