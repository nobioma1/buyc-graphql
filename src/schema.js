const { gql } = require('apollo-server');

module.exports = gql`
  type CalculatePrice {
    value: Float!
    currency: String!
  }

  enum TypeFields {
    buy
    sell
  }

  type Query {
    info: String!
    calculatePrice(
      type: TypeFields!
      margin: Float!
      exchangeRate: Float!
    ): CalculatePrice!
  }
`;
