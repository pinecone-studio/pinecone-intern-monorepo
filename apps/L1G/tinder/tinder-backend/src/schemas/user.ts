import gql from 'graphql-tag';

export const UsertypeDefs = gql`
  type User {
    id: ID!
    email: String!
    genderPreferences: String
    gender: String
    dateOfBirth: String
    name: String
    bio: String
    interests: [Interest]
    profession: String
    schoolWork: String
    images: [String!]
    likedBy: [User]
    likedTo: [User]
    matchIds: [Match]
  }
  type Match {
    id: ID!
    users: [User!]!
    matchedAt: String!
    unmatched: Boolean!
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

  type SignupResponse {
    id: ID!
    email: String!
    token: String!
  }

  type ChatMessage {
    id: ID!
    senderId: ID!
    receiverId: ID!
    content: String!
    createdAt: String!
    seen: Boolean!
  }
  type ChatParticipant {
    id: ID!
    name: String!
    image: String
  }
  type MatchChatMessages {
    matchId: ID!
    participant: ChatParticipant!
    messages: [ChatMessage!]!
  }

  type Query {
    getusers: [User]
    getUser(_id: ID!): User
    getUserAllChatMessages(userId: ID!): [MatchChatMessages!]!
    getChatWithUser(userId: ID!, participantId: ID!): MatchChatMessages!
  }
  type Mutation {
    forgotPassword(newPassword: String!, otpId: String!): ForgotPasswordPayload!
    requestSignup(email: String!, otpType: OtpType!): RequestSignupResponse!
    verifyOtp(email: String!, otp: String!, otpType: OtpType!): VerifyOtpResponse!
    signup(otpId: String!, password: String!): SignupResponse!
    updateProfile(
      id: ID!
      name: String
      email: String
      dateOfBirth: String
      genderPreferences: String
      gender: String
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

    sendMessage(senderId: ID!, receiverId: ID!, matchId: ID!, content: String!): ChatMessage!
    markMessagesAsSeen(matchId: ID!, userId: ID!): Boolean
  }
`;
