import { gql } from '@apollo/client'

const newUser = gql`mutation($email: String!) {
    addUser(email: $email){
        id
        email
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

  export { newUser, LoadQuestion, SaveAnswer }