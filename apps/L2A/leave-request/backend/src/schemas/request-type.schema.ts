import gql from 'graphql-tag';

export const typeDefs = gql`
  scalar Date
  input RequestTypeInput {
    name: String!
    limit: Int!
    period: String!
  }
  type RequestType {
    _id: ID!
    name: String!
    limit: Int!
    period: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Mutation {
    createRequestType(args: RequestTypeInput): RequestType!
  }
`;
