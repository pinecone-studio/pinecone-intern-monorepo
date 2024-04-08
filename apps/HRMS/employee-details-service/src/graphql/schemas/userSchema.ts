import { gql } from 'graphql-tag';

export const Userchema = gql`
  type User {
    name: String!
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String): User
  }
`;
