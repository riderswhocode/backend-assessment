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
    input UserData {
        email: String!
    }

    type RootQueryType {
        questions: [QuestionData]
    }

    type RootMutation {
        addUser(userInput: UserData): User
    }

    schema {
        query: RootQueryType
        mutation: RootMutation
    }
`);