const { ApolloServer } = require('apollo-server');

const schema = require('../schema');
const resolvers = require('../resolvers');

const constructTestServer = () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  return { server };
};

module.exports.constructTestServer = constructTestServer;
