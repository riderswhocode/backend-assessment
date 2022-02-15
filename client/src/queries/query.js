import { gql } from '@apollo/client'

const newUser = gql`mutation($email: String!) {
    addUser(email: $email){
        id
        email
    }
  }`

const newUserV2 = gql`mutation($email: String!) {
    addUser(userInput: {email: $email}){
        _id
        email
    }
  }`

const LoadQuestionV2 = gql`query BrowseQuestionV2 {
  questions {
    _id
    question
    options {
      _id
      option
      correct
      question_id
    }
  }
}`

 const LoadQuestion = gql`query BrowseQuestions {
    questions {
      id
      question
      options {
        id
        option
        correct
      }
    }
  }` 

const SaveAnswer = gql`mutation($question_id: ID!, $user_id: ID, $option: String, $points: Int) {
  addAnswer(question_id: $question_id, user_id: $user_id, option: $option, points: $points) {
    option
    points
    question_id {
      question
    }
    user_id {
      email
    }
  }
}`

const SaveAnswerV2 = gql`mutation($option: String, $points: Int, $question_id: String!, $user_id: String!) {
  saveUserAnswer(userInput: {option: $option, points: $points, question_id: $question_id, user_id: $user_id}) {
    _id
    option
    points
  }
}`

const getUserPoints = gql`query($user_id: ID!) {
  userAnswer(user_id: $user_id) {
    points
  }
}`

  export { newUser, newUserV2, LoadQuestionV2, LoadQuestion, SaveAnswer, SaveAnswerV2, getUserPoints }