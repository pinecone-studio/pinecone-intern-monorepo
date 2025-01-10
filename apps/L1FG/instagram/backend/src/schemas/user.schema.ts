import gql from "graphql-tag";

export const UserTypeDefs = gql`
enum Gender {
female 
male 
not_know
}
type User {
_id: String!
userName: String!
fullName: String!
bio: String!
profileImage: String!
password: String!
hasStory: Boolean
gender: Gender
isPrivate: Boolean
email:String!
}

input UserInput {
userName: String!
fullName: String!
password: String!
email:String!
}


type Mutation {
createUser(input: UserInput!):User
}

`