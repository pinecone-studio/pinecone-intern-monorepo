import gql from 'graphql-tag';

export const typeDefs = gql`
  type Booking {
    _id: ID!
    user_id: User!
    event_id: Event!
  }
`;
