const workspaceServices = require("../../services/workspace");

module.exports = {
  Query: {
    getListWorkspace: async (_, { page, query }) => {
      return await workspaceServices.getListWorkspace(page, query);
    },
    getDetailWorkspace: (_, { id }) => workspaceServices.getDetailWorkspace(id),
  },
  Mutation: {
    createWorkspace: async (_, { name, email }) => {
      return await workspaceServices.createWorkspace(name, email);
    },
  },
};
