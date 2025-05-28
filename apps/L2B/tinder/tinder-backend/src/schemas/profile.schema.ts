import gql from 'graphql-tag';

export const profileTypeDefs = gql`
  scalar JSON

  scalar Date

  type ProfileInfo {
    name: String!
    bio: String!
    interest: String!
    profession: String!
    school: String!
  }
  type Profile {
    _id: ID!
    user: User!
    interestedIn: String!
    age: Int!
    profileInfo: ProfileInfo!
    images: [String!]!
  }
  input ProfileInput {
    name: String!
    bio: String!
    interest: String!
    profession: String!
    school: String!
  }
  input ProfileChangeInput {
    name: String
    bio: String
    interest: String
    profession: String
    school: String
  }
  input CreateProfileInput {
    user: ID!
    interestedIn: String!
    age: Int!
    profileInfo: ProfileInput!
    images: [String!]!
  }
  input UpdateProfileInput {
    age: Int
    images: [String]
    interestedIn: String
    profileInfo: ProfileChangeInput
  }

  type Query {
    fetchProfile(_id: ID!): Profile!
    fetchAllProfile: [Profile!]!
  }

  type Mutation {
    createProfile(input: CreateProfileInput!): Profile!
    updateProfile(id: ID!, input: UpdateProfileInput!): Profile!
    updateProfileImage(userId: ID!, images: [String!]!): Profile
  }
`;
