const { ApolloError } = require('apollo-server');

const getPriceUSD = require('./utils/getPriceUSD');

const resolvers = {
  Query: {
    info: () => 'Welcome to BuyCoinsGraphQl Challenge',
    calculatePrice: async (root, args, context) => {
      try {
        let marginPercentage;
        // get current price of Bitcoin
        const price = await getPriceUSD('BTC');
        if (args.type === 'sell') {
          // If the type is sell, subtract the computed value of
          // the margin percentage from the current Bitcoin price
          marginPercentage = price.rate - price.rate * args.margin;
        } else {
          // If the type is buy, add the computed value of the
          // margin percentage from the current Bitcoin price
          marginPercentage = price.rate + price.rate * args.margin;
        }
        // calcluate exchangeRate in NGN and not USD using the exchangeRate args
        return {
          value: marginPercentage * args.exchangeRate,
          currency: 'NGN',
        };
      } catch (error) {
        throw new ApolloError(error.message, 400);
      }
    },
  },
};

module.exports = resolvers;
