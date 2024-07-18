import { gql } from 'apollo-server-cloud-functions';

export const cmsUserTypeDefs = gql`
  type cmsUser {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    roles: [cmsRole!]!
    password: String!
  }

  enum cmsRole {
    ADMIN
    CREATOR
    USER
  }

  input cmsCreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    roles: [cmsRole!]!
    password: String!
  }

  input cmsUpdateUserInput {
    firstName: String
    lastName: String
    email: String
    roles: [cmsRole]
    password: String
  }

  type Query {
    getCmsUsers: [cmsUser]
    getCmsUser(_id: String!): cmsUser
  }

  type Mutation {
    createCmsUser(input: cmsCreateUserInput): cmsUser!
    updatedCmsUser(_id: ID!, input: cmsUpdateUserInput!): cmsUser!
    deletedCmsUser(_id: ID!): cmsUser
  }
`;
