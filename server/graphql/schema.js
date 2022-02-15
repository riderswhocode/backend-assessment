const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    
    type OptionData {
        _id: String
        option: String
        correct: Boolean
        question_id: String
    }

    type QuestionData {
        _id: String
        question: String
        options: [OptionData]
    }

    type User {
        _id: ID
        email: String
    }

    type Question {
        _id: ID
        question: String
    }

    type UserAnswer {
        _id: ID
        option: String
        points: Int
        question_id: String
        user_id: String
    }

    input UserData {
        email: String!
    }

    input QuestionInfo {
        question: String!
    }

    input OptionInfo {
        option: String
        correct: Boolean
        question_id: String
    }

    input AnswersInfo {
        question_id: String
        user_id: String
        option: String
        points: Int
    }

    type RootQueryType {
        questions: [QuestionData]
    }

    type RootMutation {
        addUser(userInput: UserData): User
        addQuestion(userInput: QuestionInfo): Question
        addAnswers(userInput: OptionInfo): QuestionData
        saveUserAnswer(userInput: AnswersInfo): UserAnswer
    }

    schema {
        query: RootQueryType
        mutation: RootMutation
    }
`);