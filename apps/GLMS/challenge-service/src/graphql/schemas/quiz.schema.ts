import { gql } from 'graphql-tag';

export const quizTypeDefs = gql`
  scalar Date

  type Query {
    getQuiz(_id: ID!): Quiz
    getQuizzes: [Quiz]
  }

  type Mutation {
    createQuiz(createInput: CreateQuizInput): Quiz
    updateQuiz(updateInput: UpdateQuizInput): Quiz
    deleteQuiz(id: ID!): Quiz
  }

  type Quiz {
    id: ID!
    lessonId: Lesson
    questions: [Question]
  }

  type Lesson {
    id: ID!
    title: String!
    description: String
    quizzes: [Quiz]
  }

  type Question {
    id: ID!
    text: String!
    options: [Option]
    correctAnswer: String
  }

  type Option {
    optionText: String!
    isCorrect: Boolean!
  }

  input CreateQuizInput {
    lessonId: ID!
    questions: [QuestionInput]!
  }

  input UpdateQuizInput {
    id: ID!
    lessonId: ID
    questions: [QuestionInput]
  }

  input QuestionInput {
    text: String!
    options: [OptionInput]!
    correctAnswer: String
  }

  input OptionInput {
    optionText: String!
    isCorrect: Boolean! 
  }
`;