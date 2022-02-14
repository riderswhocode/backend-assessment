const express = require('express')
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const cors = require('cors')

const testSchema = require('./graphql/schem')
const testResolver = require('./graphql/resolver')

const app = express()

app.use(cors())

const localCon = "mongodb://localhost/backend-assessment"
mongoose.connect(localCon)

mongoose.connection.once('open', () => {
    console.log("Successfully connected to MongoDB Database");
})

// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }))
app.use('/graphql', graphqlHTTP({
    schema: testSchema,
    rootValue: testResolver,
    graphiql: true
}))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express Server Running on ${process.env.PORT || 3000}`)
})