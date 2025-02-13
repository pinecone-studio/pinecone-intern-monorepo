import gql from 'graphql-tag';

export const UserTypeDefs = gql`
  type User {
    _id: ID!
    password: String!
    email: String!
  }

  input UserInput {
    password: String!
    email: String!
  }
  type AuthResponse {
    user: User!
    token: String!
  }
  input NewpasswordInput {
    email: String!
    newPassword: String!
  }
  type NewPassword {
    password: String!
    email: String!
  }
  input orderNewPassword {
    oldPassword: String!
    newPassword: String!
    userId: String!
  }
  type Mutation {
    signUp(input: UserInput!): User!
    signIn(input: UserInput!): AuthResponse!
    updatePassword(input: NewpasswordInput!): NewPassword!
    newPassword(input: orderNewPassword!): NewPassword!
  }
`;
