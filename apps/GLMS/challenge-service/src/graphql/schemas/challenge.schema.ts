import gql from 'graphql-tag';

export const challengeTypeDefs = gql`
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
    title: String
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

  type Query {
    getChallenges: [Challenge]
    getChallengesByStatus: [Challenge]
    getChallengeById(challengeId: ID): Challenge
    getQuizById(quizId: ID!): Quiz
  }

  type Mutation {
    createChallenge(quizInput: [QuizInput], challengeInput: ChallengeInput): ID
    createQuiz(quizInput: QuizInput!): ID
    updateQuiz(quizId: String!, updateQuiz: UpdateQuiz!): Quiz
    archiveChallengeById(challengeId: ID): ID
  }
`;
