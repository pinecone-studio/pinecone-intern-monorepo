import gql from 'graphql-tag';

export const MutationTypeDefs = gql`
  type Mutation {
    addUser(email: String!, password: String!): User!
  }
`;
