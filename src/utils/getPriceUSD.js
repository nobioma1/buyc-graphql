const axios = require('axios');

async function getPriceUSD(code) {
  try {
    if (!code) throw new Error('Provide a code GPY | BTC or ...');

    // Request to Coindesk's API to retrieve the current price of 'code' in USD.
    const { data } = await axios.get(
      `https://api.coindesk.com/v1/bpi/currentprice/${code}.json`
    );

    return {
      code: data.bpi.USD.code,
      rate: data.bpi.USD.rate_float,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = getPriceUSD;
