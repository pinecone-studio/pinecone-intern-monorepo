import gql from "graphql-tag";

export const typeDefs = gql`
type User {
_id: ID!
email: String!
fullName: String!
userName: String!
isPrivate: Boolean
profileImage: String
bio: String
followers: [User!]!
following: [User!]!
posts: [Post!]!
receivedRequests: [ReceivedRequest!]!
}

# Auth
input RegisterInput {
 email: String!
 password: String!
 userName: String!
 fullName: String!
}

input LoginInput{
 email: String!
 password: String!
}

type AuthResponse {
 success: Boolean!
 message: String!
 token: String
 user: User
}

# Follow/Edit profile responses
type FollowResponse {
 success: Boolean!
 message: String!
 user: User
}

type EditProfileResponse {
 success: Boolean!
 message: String!
 user: User
}

# Queries
type Query {
 getUsers: [User!]!
 getUser(_id: ID!): User
 getProfiles(userName: String!): [User!]!
 getSomeoneProfile(userName: String!): User!
}

# Mutations
type Mutation {
 followUser(followerId: ID!, followingId: ID!): FollowResponse!
 unfollowUser(followerId: ID!, followingId: ID!): FollowResponse!
 editProfile(userId: ID!, fullName: String, userName: String, bio: String, isPrivate: Boolean, profileImage: String): EditProfileResponse!
 register (input: RegisterInput!): AuthResponse!
 login (input: LoginInput!): AuthResponse!
}
`;