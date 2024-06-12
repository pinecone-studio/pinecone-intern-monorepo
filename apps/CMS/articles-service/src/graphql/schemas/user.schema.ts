import { gql } from 'graphql-tag';

export const UserSchema = gql`
  type User {
    id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: UserRoles!
  }

  enum UserRoles {
    ADMIN
    USER
  }

  input createInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: UserRoles!
  }

  type Mutation {
    createUser(input: createInput): User
  }
`;
