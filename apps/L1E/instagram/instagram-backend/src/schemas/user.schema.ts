import gql from "graphql-tag";

export const UserTypeDefs = gql`
type User {
_id: ID!,
name: String!,
userName: String!,
}
type Query {
getUsers: [User!]}
`