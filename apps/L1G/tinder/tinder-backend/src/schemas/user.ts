import gql from 'graphql-tag';

export const UsertypeDefs = gql`
  type User {
    id: ID!
    email: String!
    genderPreferences: String
    dateOfBirth: String
    name: String
    bio: String
    interests: [Interest]
    profession: String
    schoolWork: String
    images: [String!]
    likedBy: [User]
    likedTo: [User]
    matched: [User]
  }

  type Query {
    getusers: [User]
  }
  enum OtpType {
    create
    forgot
  }

  type Mutation {
    forgotPassword(Newpassword: String!, otpId: String!): User
    requestSignup(email: String!, otpType: OtpType!): String
    verifyOtp(email: String!, otp: String!, otpType: OtpType!): String
    signup(
      otpId: String!
      password: String!
      genderPreferences: String
      dateOfBirth: String
      name: String
      images: [String!]
      bio: String
      interests: [String]
      profession: String
      schoolWork: String
    ): User
    updateProfile(
      id: ID!
      name: String
      email: String
      dateOfBirth: String
      genderPreferences: String
      bio: String
      interests: [String]
      profession: String
      schoolWork: String
      images: [String!]
    ): User

    login(email: String!, password: String!): String
    like(likedByUser: ID!, likeReceiver: ID!): String
    dislike(dislikedByUser: ID!, dislikeReceiver: ID!): String
    uploadImages(images: [String!]!): User
  }
`;
