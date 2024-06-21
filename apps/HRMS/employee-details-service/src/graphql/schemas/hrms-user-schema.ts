import { gql } from 'apollo-server-cloud-functions';

export const hrmsUserTypeDefs = gql`
  type hrmsUser {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    role: HrmsRoles!
    password: String!
  }

  enum HrmsRoles {
    EMPLOYEE
    ADMIN
  }

  input hrmsCreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    password: String!
  }

  input hrmsUpdateUserInput {
    firstName: String
    lastName: String
    email: String
    role: String
    password: String
  }

  type Query {
    getHrmsUsers: [hrmsUser]
    getHrmsUser(_id: String!): hrmsUser
  }

  type Mutation {
    createHrmsUser(input: hrmsCreateUserInput): hrmsUser!
    updatedHrmsUser(_id: ID!, input: hrmsUpdateUserInput!): hrmsUser!
    deletedHrmsUser(_id: ID!): hrmsUser
  }
`;
