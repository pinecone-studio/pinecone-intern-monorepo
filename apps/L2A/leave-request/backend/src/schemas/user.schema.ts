import gql from "graphql-tag";

export const typeDefs = gql`
input UserInput {
  username: String!
  email: String!
  profilePicture: String!
}

type AuthPayload {
  accessToken: String!
  refreshToken: String!
  user: User!
}

type TokenPayload {
  accessToken: String!
  refreshToken: String!
}

type Query {
  sampleQuery: String!
  me: User
}

type Mutation {
  createUser(userArgs: UserInput): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  refreshToken(token: String!): TokenPayload!
  requestOTP(email: String!): Boolean
  verifyOTP(email: String!, otp: String!): Boolean
}
`