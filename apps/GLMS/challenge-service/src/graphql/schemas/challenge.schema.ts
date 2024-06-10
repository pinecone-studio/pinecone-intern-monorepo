import gql from 'graphql-tag';

export const challengeTypeDefs = gql`
  scalar Date

  enum StatusType {
    DRAFT
    APPROVED
    ARCHIVE
  }
  enum ChoicesType {
    IMAGE
    TEXT
  }

  type Choices {
    _id: ID
    choice: String
    isCorrect: Boolean
  }

  type Quiz {
    _id: ID
    question: String
    choices: [Choices]
    choicesType: ChoicesType
  }

  type Challenge {
    _id: ID
    author: String
    courseId: String
    status: StatusType
    quiz: [Quiz]
  }

  input ChoicesInput {
    choice: String
    isCorrect: Boolean
  }

  input QuizInput {
    question: String
    choices: [ChoicesInput]
    choicesType: ChoicesType
  }

  input ChallengeInput {
    courseId: String
    xp: Int
    author: String
    status: StatusType
  }

  input InputChoices {
    choice: String
    isCorrect: Boolean
  }

  input UpdateQuiz {
    question: String
    choices: [InputChoices]
    choicesType: ChoicesType
  }
  input UpdateChallengeInput {
    title: String
    quiz: [QuizInput]
    referenceLesson: ID
    experiencePoint: Int
  }

  type ChallengeSession {
    _id: ID
    studentEmail: String
    challengeId: ID
    challengeTitle: String
    experiencePoint: Int
    startedAt: Date
    endAt: Date
  }

  type Course {
    id: ID
    title: String
    description: String
    thumbnail: String
    status: String
    createdAt: Date
  }
  type AllChallenges {
    _id: ID
    author: String
    courseId: Course
    status: StatusType
    quiz: [Quiz]
  }

  input ChallengeSessionInput {
    studentEmail: String
    challengeId: ID
    challengeTitle: String
    experiencePoint: Int
    startedAt: Date
    endAt: Date
  }

  type Query {
    getChallenges: [Challenge]
    getChallengesByStatus: [Challenge]
    getChallengeById(courseId: String): Challenge
    getDraftChallenges: [AllChallenges]
    getArchiveChallenges: [AllChallenges]
    getApprovedChallenges: [AllChallenges]
    getChallengeSessions: [ChallengeSession]
  }

  type Mutation {
    createChallenge(quizInput: [QuizInput!]!, challengeInput: ChallengeInput): ID
    archiveChallengeById(challengeId: ID): ID
    publishChallengeById(challengeId: String!): ID
    deleteChallengeById(challengeId: String!): ID
    updateChallenge(challengeId: ID!, updateChallengeInput: UpdateChallengeInput!): Challenge
    submitChallenge(challengeSessionInput: ChallengeSessionInput): ID
  }
`;
