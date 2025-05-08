import gql from 'graphql-tag';

export const typeDefs = gql`
  type Service {
    sdl: String!
  }

  type Query {
    _service: Service!
  }
`;
