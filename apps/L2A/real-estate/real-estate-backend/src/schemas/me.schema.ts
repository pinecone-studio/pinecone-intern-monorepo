import gql from 'graphql-tag';

export const typeDefs = gql`
type Query {
    me: User
    }
`;