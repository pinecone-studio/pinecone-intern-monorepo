import gql from "graphql-tag";

export const UserTypeDefs = gql`
type User{
    _id:ID!
    email:String!
    username:String!
    password:String!
    profilePicture:String!
    bio:String!
    isPrivate:Boolean!
    createdAt: String!  
    updatedAt: String!
}
`