import gql from 'graphql-tag';

export const challengeTypeDefs = gql`
  scalar Date

  enum StatusType {
    DRAFT
    APPROVED
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
    title: String
    author: String
    refCourse: String
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
    refCourse: String
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
    experiencePoint: Int
    startedAt: Date
    endAt: Date
  }

  input ChallengeSessionInput {
    studentEmail: String
    challengeId: ID
    experiencePoint: Int
    startedAt: Date
    endAt: Date
  }

  type Query {
    getChallenges: [Challenge]
    getChallengesByStatus: [Challenge]
    getChallengeById(challengeId: ID): Challenge
    getQuizById(quizId: ID!): Quiz
  }

  type Mutation {
    createChallenge(quizInput: [QuizInput!]!, challengeInput: ChallengeInput): ID
    createQuiz(quizInput: QuizInput!): ID
    updateQuiz(quizId: String!, updateQuiz: UpdateQuiz!): Quiz
    archiveChallengeById(challengeId: ID): ID
    deleteQuiz(quizId: String!): Quiz
    publishChallengeById(challengeId: String!): ID
    deleteChallengeById(challengeId: String!): ID
    updateChallenge(challengeId: ID!, updateChallengeInput: UpdateChallengeInput!): Challenge
    submitChallenge(challengeSessionInput: ChallengeSessionInput): ID
  }
`;
