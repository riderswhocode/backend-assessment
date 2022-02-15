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

    type RootQueryType {
        questions: [QuestionData]
    }

    type RootMutation {
        addUser(userInput: UserData): User
        addQuestion(userInput: QuestionInfo): Question
        addAnswers(userInput: OptionInfo): QuestionData
    }

    schema {
        query: RootQueryType
        mutation: RootMutation
    }
`);