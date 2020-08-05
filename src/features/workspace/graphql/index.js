const { makeExecutableSchema } = require("graphql-tools");
const { graphqlHTTP } = require("express-graphql");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = (api) => {
  api.use("/workspace", graphqlHTTP({ schema, graphiql: true }));
};
