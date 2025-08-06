import gql from "graphql-tag";

export const typeDefs = gql`
type ReceivedRequest {
_id: ID!
receiverId: User!
senderId: User!
createdAt: Date!
}
`