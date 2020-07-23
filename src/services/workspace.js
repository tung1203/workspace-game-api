const WorkspaceModel = require("../models/workspace");
const escapeRegex = require("../utils/regex-escape");

module.exports = {
  createWorkspace: (name, email) => WorkspaceModel.create({ name, email }),

  getListWorkspace: async (page = 1, query) => {
    const pageSize = 3;
    page = page > 0 ? page : 1;
    let listWorkspace, totalWorkspace;

    let searchName = {};
    if (query) {
      name = new RegExp(escapeRegex(query), "gi");
      searchName = {
        name: name,
      };
    }
    listWorkspace = await WorkspaceModel.find(searchName)
      .sort({ createdAt: -1 })
      .skip(pageSize * page - pageSize)
      .limit(pageSize);
    totalWorkspace = await WorkspaceModel.countDocuments(searchName);
    return { listWorkspace, totalWorkspace };
  },
  getDetailWorkspace: (id) => WorkspaceModel.findOne({ _id: id }),
};
