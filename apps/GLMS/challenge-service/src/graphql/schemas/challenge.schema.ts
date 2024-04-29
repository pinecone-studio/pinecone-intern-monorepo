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
  type Query {
    getChallenges: [Challenge]
    getChallengesByStatus: [Challenge]
  }

  type Mutation {
    createChallenge(quizInput: [QuizInput], challengeInput: ChallengeInput): ID
  }
`;
