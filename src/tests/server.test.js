const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const axios = require('axios');

const { constructTestServer } = require('./testSetup');

const GET_INFO = gql`
  query {
    info
  }
`;

const CALCULATE_PRICE = gql`
  query calculatePrice(
    $type: TypeFields!
    $margin: Float!
    $exchangeRate: Float!
  ) {
    calculatePrice(type: $type, margin: $margin, exchangeRate: $exchangeRate) {
      value
      currency
    }
  }
`;

jest.mock('axios');

describe('Server', () => {
  test('[query info] Get API information', async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const res = await query({ query: GET_INFO });

    expect(res.data).toEqual({ info: 'Welcome to BuyCoinsGraphQl Challenge' });
  });

  test('[query calculatePrice] Calculate "SELL"', async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const rate = 20093.92;
    const exchangeRate = 358;
    const margin = 0.2;
    const computedMargin = margin * rate;

    const mockRes = {
      data: {
        bpi: {
          USD: {
            code: 'USD',
            rate: `${rate}`,
            description: 'United States Dollar',
            rate_float: rate,
          },
        },
      },
    };

    axios.get.mockResolvedValue(mockRes);

    const res = await query({
      query: CALCULATE_PRICE,
      variables: { type: 'sell', margin, exchangeRate },
    });

    expect(res.data).toEqual({
      calculatePrice: {
        value: (rate - computedMargin) * exchangeRate,
        currency: 'NGN',
      },
    });
  });
});
