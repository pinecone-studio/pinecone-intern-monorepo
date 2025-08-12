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
  type ForgotPasswordPayload {
    message: String!
    user: User!
  }
  type RequestSignupResponse {
    input: String!
    output: String!
  }
  type VerifyOtpResponse {
    input: String!
    output: String!
    otpId: ID!
  }
  type Mutation {
    forgotPassword(newPassword: String!, otpId: String!): ForgotPasswordPayload!
    requestSignup(email: String!, otpType: OtpType!): RequestSignupResponse!
    verifyOtp(email: String!, otp: String!, otpType: OtpType!): VerifyOtpResponse!
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
