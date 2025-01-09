import gql from "graphql-tag";

export const UserTypeDefs = gql`
type User {
_id: String
userName: String
fullName: String
bio: String
profileImage: String
password: String
hasStory: Boolean
gender: String
isPrivate: Boolean
}

input UserInput {
userName: String!
fullName: String!
bio: String
profileImage: String
password: String!
hasStory: Boolean
gender: String
isPrivate: Boolean
}

type Mutation {
createUser(input: UserInput!):User!
}

`