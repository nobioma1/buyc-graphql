const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const axios = require('axios');

const { constructTestServer } = require('./testSetup');

const GET_INFO = gql`
  query {
    info
  }
`;

describe('Server', () => {
  test('[query info] Get API information', async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const res = await query({ query: GET_INFO });

    expect(res.data).toEqual({ info: 'Welcome to BuyCoinsGraphQl Challenge' });
  });

});
