const axios = require('axios');

async function getPriceUSD(code) {
  try {
    // Request to Coindesk's API to retrieve the current price of 'code' in USD.
    const { data } = await axios.get(
      `https://api.coindesk.com/v1/bpi/currentprice/${code}.json`
    );

    return {
      code: data.bpi.USD.code,
      rate: data.bpi.USD.rate_float,
    };
  } catch (error) {
    throw new Error(`Something went wrong fetching current "${code}" rates`);
  }
}

module.exports = getPriceUSD;
