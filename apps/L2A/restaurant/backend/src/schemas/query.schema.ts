import gql from 'graphql-tag';

export const QueryTypeDefs = gql`
  type Query {
    sampleQuery: String!
    _service: Service!
    getCategories: [Category!]!
    getCategory(id: ID!): Category!
  }
`;
