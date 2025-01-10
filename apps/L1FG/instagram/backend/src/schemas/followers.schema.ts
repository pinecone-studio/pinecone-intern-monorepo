import gql from "graphql-tag";

export const FollowerTypeDefs = gql`
type Follow {
_id: ID
followerId: ID!
targetId: ID!
}

input FollowInput {
followerId: ID!
targetId: ID!
}

type Mutation {
createFollower(input: FollowInput!):Follow!
}
`