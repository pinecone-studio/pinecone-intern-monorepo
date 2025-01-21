import gql from 'graphql-tag';

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
    profileImage: String
    password: String!
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean
    email: String!
  }

  type UserWithoutPassword {
    _id: String!
    userName: String!
    fullName: String!
    bio: String!
    profileImage: String
    hasStory: Boolean
    gender: Gender
    isPrivate: Boolean
    email: String!
    followerCount: Int!
    followingCount: Int!
    postCount: Int!
  }

  type SignInType {
    token: ID!
    exp: Int!
    user: User!
  }

  input UserInput {
    userName: String!
    fullName: String!
    password: String!
    email: String!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  type Query {
    getUser: UserWithoutPassword
    getUsers: [UserWithoutPassword]
  }
  type Mutation {
    createUser(input: UserInput!): User!
    updateName(name: String!): String
    updateFullName(name : String!): String
    login(input: SignInInput!): SignInType!
  }
`;

// type UserTogetherViewerType
// {

// }
// viewer:UserTogetherViewerType

// type UserTogetherUserType
// {
//      _id: String!
//   userName: String!
//   fullName: String!
//   bio: String!
//   profileImage: String
//   hasStory: Boolean
//   gender: Gender
//   isPrivate: Boolean
//   email: String!
// }
// type UserTogetherType {
//   user :UserTogetherUserType
// }
// getUserTogether(searchingUserId:String!):UserTogetherType!
