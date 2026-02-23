import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Auth {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Answer {
    id: ID!
    body: String!
    createdBy: String!
    userId: ID!
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Question {
    id: ID!
    title: String!
    body: String!
    createdBy: String!
    userId: ID!
    user: User!
    answers: [Answer!]!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AnswerInput {
    body: String!
    createdBy: String!
    userId: ID!
  }

  input QuestionInput {
    title: String!
    body: String!
  }

  type Query {
    questions: [Question!]!
    question(id: ID!): Question
    me: User
  }

  type Mutation {
    register(input: UserInput!): Auth!
    login(input: LoginInput!): Auth!
    createQuestion(input: QuestionInput!): Question!
    addAnswer(questionId: ID!, input: AnswerInput!): Answer!
  }
`;
