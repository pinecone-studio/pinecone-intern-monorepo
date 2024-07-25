import { gql } from 'graphql-tag';

export const quizTypeDefs = gql`
  scalar Date

  type Query {
    getQuizzes: [Quiz]
    getQuiz(courseId: ID!): Quiz

    getQuestions(quizId: ID!): [Question]
    getQuestion(_id: ID!): Question

    # getOptions(questionId: ID!): [Option]
    getOptions: [Option]
    getOption(id: ID!): Option
  }

  type Mutation {
    createQuiz(createInput: CreateQuizInput!): Quiz
    updateQuiz(updateInput: UpdateQuizInput!): Quiz
    deleteQuiz(id: ID!): Quiz

    createQuestion(createInput: CreateQuestionInput!): Question
    updateQuestion(updateInput: UpdateQuestionInput!): Question
    deleteQuestion(id: ID!): Question

    createOption(createInput: CreateOptionInput!): Option
    updateOption(updateInput: UpdateOptionInput!): Option
    deleteOption(id: ID!): Option
  }

  type Quiz {
    id: ID!
    courseId: ID!
    createdAt: Date
  }

  type Question {
    id: ID!
    quizId: Quiz
    text: String!
    options: [Option]
    # correctAnswer: ID!
    createdAt: Date
  }

  type Option {
    id: ID!
    questionId: Question
    optionText: String!
    isCorrect: Boolean!
    createdAt: Date
  }

  # Quiz's input
  input CreateQuizInput {
    courseId: ID!
  }

  input UpdateQuizInput {
    id: ID!
    lessonId: ID
    questions: [UpdateQuestionInput]
  }

  # Question's input
  input CreateQuestionInput {
    text: String!
    quizId: ID!
    options: [CreateOptionInput]!
    # correctAnswer: ID!
  }

  input UpdateQuestionInput {
    id: ID!
    text: String
    options: [UpdateOptionInput]
    # correctAnswer: ID
  }

  # Option's input
  input CreateOptionInput {
    optionText: String!
    isCorrect: Boolean!
  }

  input UpdateOptionInput {
    id: ID!
    optionText: String
    isCorrect: Boolean
  }
`;
