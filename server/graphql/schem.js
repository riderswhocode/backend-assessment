const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type TestData {
        text: String
        views: Int
    }

    input UserData {
        email: String!
    }

    type User {
        _id: ID
        email: String
    }

    type RootQueryType {
        hello: TestData
    }

    type RootMutation {
        addUser(userInput: UserData): User 
    }

    schema {
        query: RootQueryType
        mutation: RootMutation
    }
`);