import gql from 'graphql-tag';

export const RequestTypeDefs = gql`
  type Request {
    _id: ID
    from: ID!
    to: ID!
    status: String!
  }

  input RequestInput {
    from: ID!
    to: ID!
    status: String!
  }

  type Mutation {
    creteRequest(input: RequestInput!): Request!
    removeRequest(followerId: String): Request
  }
`;
