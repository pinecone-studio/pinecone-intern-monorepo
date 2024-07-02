import { gql } from 'apollo-server-cloud-functions';

export const loginSchema = gql`

input hrmsLoginInput {
    email: String!
    password: String!
  }
 
 type Message {
    message: String!
 }

 type Token {
    token: String!
    message: String!
 }


  type Mutation {
    loginUser(input: hrmsLoginInput!): Token!
  }
`;