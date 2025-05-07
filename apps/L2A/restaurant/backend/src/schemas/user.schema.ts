import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    username: String!
    email: String!
  }
  input RegisterInput {
    username: String!
    email: String!
  }
  input LoginInput {
    username: String!
  }
`;
