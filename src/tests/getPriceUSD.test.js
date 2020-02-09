const axios = require('axios');
const getPriceUSD = require('../utils/getPriceUSD');

jest.mock('axios');

describe('getPriceUSD Request', () => {
  test('should fetch price', async () => {
    const mockRes = {
      data: {
        bpi: {
          USD: {
            code: 'USD',
            rate: '10,093.9083',
            description: 'United States Dollar',
            rate_float: 10093.9083,
          },
        },
      },
    };

    axios.get.mockResolvedValue(mockRes);
    const res = await getPriceUSD('BTC');

    expect(res).toEqual({ code: 'USD', rate: 10093.9083 });
  });
});
