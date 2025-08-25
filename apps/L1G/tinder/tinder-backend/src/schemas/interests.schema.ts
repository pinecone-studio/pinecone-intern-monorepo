import { gql } from 'apollo-server-cloud-functions';
export const InterestsTypeDefs = gql`
  type Interest {
    _id: ID!
    interestName: String
  }
  type Query {
    getInterest(_id: ID!): Interest!
    getAllInterests: [Interest!]!
  }
  type Mutation {
    createInterest(interestName: String!): Interest!
    updateInterest(_id: ID!, interestName: String!): Interest!
    deleteInterest(_id: ID!): Interest!
  }
`;
