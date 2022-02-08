import { gql } from '@apollo/client'

const newUser = gql`mutation NewUser {
    addUser(email: $email){
        id
        email
    }
  }`

const BrowseUser = gql`query BrowseUserId {
    user(id: $id){
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
  export { newUser, BrowseUser, LoadQuestion }