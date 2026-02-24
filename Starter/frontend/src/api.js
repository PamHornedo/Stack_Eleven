import { gql } from "@apollo/client";
import { client } from "./apolloClient";

export const api = {
  register: async payload => {
    const REGISTER = gql`
      mutation ($input: RegisterInput!) {
        register(input: $input) {
          token
          user {
            id
            username
            email
            createdAt
          }
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: REGISTER,
      variables: { input: payload },
    });
    return data.register;
  },

  login: async payload => {
    const LOGIN = gql`
      mutation ($input: LoginInput!) {
        login(input: $input) {
          token
          user {
            id
            username
            email
          }
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: LOGIN,
      variables: { input: payload },
    });
    return data.login;
  },

  getQuestions: async () => {
    const GET_QUESTIONS = gql`
      query {
        questions {
          id
          title
          body
          createdBy
          createdAt
          answers {
            id
            body
            createdBy
            createdAt
          }
        }
      }
    `;
    const { data } = await client.query({
      query: GET_QUESTIONS,
      fetchPolicy: "no-cache",
    });
    return data.questions;
  },

  getQuestionById: async id => {
    const GET_QUESTION = gql`
      query ($id: ID!) {
        question(id: $id) {
          id
          title
          body
          createdBy
          createdAt
          answers {
            id
            body
            createdBy
            createdAt
          }
        }
      }
    `;
    const { data } = await client.query({
      query: GET_QUESTION,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    return data.question;
  },

  createQuestion: async payload => {
    const CREATE_QUESTION = gql`
      mutation ($input: CreateQuestionInput!) {
        createQuestion(input: $input) {
          id
          title
          body
          createdBy
          createdAt
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: CREATE_QUESTION,
      variables: { input: payload },
    });
    return data.createQuestion;
  },

  createAnswer: async (questionId, payload) => {
    const ADD_ANSWER = gql`
      mutation ($questionId: ID!, $input: CreateAnswerInput!) {
        addAnswer(questionId: $questionId, input: $input) {
          id
          body
          createdBy
          createdAt
        }
      }
    `;
    const { data } = await client.mutate({
      mutation: ADD_ANSWER,
      variables: { questionId, input: payload },
    });
    return data.addAnswer;
  },
};
