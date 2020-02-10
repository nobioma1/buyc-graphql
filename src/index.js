// You're going to create a GraphQL API with one query.
// The query calculatePrice will accept three required arguments:

// - type: This can either be buy or sell, nothing else.
// - margin: This is a percentage that will be used in a calculation.
//           Not a fraction, a percentage. For example, if 0.2 is passed into
//           this argument, then the calculation should be done with 0.2%.
// - exchangeRate: This is a custom USD/NGN exchange rate that will be used in
//                 the calculation detailed below.

// The calculation
// - When calculatePrice is called, your API must make a request
//   to Coindesk's API to retrieve the current price of Bitcoin in USD.
// - If the type is sell, then your API should subtract the computed value
//   of the margin percentage from the current Bitcoin price it just retrieved.
// - If the type is buy, then your API should add the computed value of the margin
//   percentage to the current Bitcoin price it just retrieved.
// - Finally, the number calculatePrice responds will be in NGN and not USD.
//   This should be calculated using the exchangeRate argument.

// Other important things
// - Your API must mount a GraphiQL interface at /graphiql.
// - Cleanliness, readability of code and good separation
//   of concerns are very important with this challenge.
// - Writing [good] tests is recommended and will attract extra points!
// - Host the API wherever you want. Heroku is a good place to host something
//   like this for free.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');

const schema = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphiql' });

const httpServer = http.createServer(app);

httpServer.listen({ port }, () => {
  console.log(`server live at http://localhost:${port}/graphiql`);
});
