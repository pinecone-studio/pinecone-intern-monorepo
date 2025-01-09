import gql from 'graphql-tag';

export const testTypeDefs = gql`
  type Test {
    _id: ID
    name: String
    phoneNumber: Int
    email: String
  }

  type Mutation {
    createTest(name: String, email: String, phoneNumber: Int): Test!
  }
`;
