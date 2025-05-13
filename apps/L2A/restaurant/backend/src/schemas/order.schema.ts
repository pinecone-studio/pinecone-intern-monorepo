import gql from 'graphql-tag';

export const OrderTypeDefs = gql`
  type OrderProduct {
    product: Product!
    quantity: Int!
    priceWhenOrdered: Int!
  }

  type Order {
    _id: ID!
    user: User!
    products: [OrderProduct!]!
    createdAt: Date!
    updatedAt: Date!
  }

  input OrderProductInput {
    product: ID!
    quantity: Int!
    priceWhenOrdered: Int!
  }

  input OrderInput {
    products: [OrderProductInput!]!
  }
`;
