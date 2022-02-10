const graphql = require('graphql')

const UserModel = require('../models/user.model')
const UserAnswerModel = require('../models/user_answer.model')
const QuestionModel = require('../models/question.model')
const OptionModel = require('../models/option.model')

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql

const Users = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    })
})

const UserAnswers = new GraphQLObjectType({
    name: 'UserAnswers',
    fields: () => ({
        option: { type: GraphQLString },
        points: { type: GraphQLInt },
        user_id:  {
            type: Users,
            resolve(parent, args) {
                return UserModel.findById({ _id: parent.user_id })
            }
        },
        question_id: {
            type: Questions,
            resolve(parent, args) {
                return QuestionModel.findById({ _id: parent.question_id })
            }
        }
    })
})

const Questions = new GraphQLObjectType({
    name: 'Question',
    fields: () => ({
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        options: {
            type: new GraphQLList(Options),
            resolve(parent, args) {
                return OptionModel.find({ question_id: parent._id.toString() })
            }
        }
    })
})

const Options = new GraphQLObjectType({
    name: 'Option',
    fields: () => ({
        id: { type: GraphQLID },
        option: { type: GraphQLString },
        detail: { type: GraphQLString },
        correct: { type: GraphQLBoolean},
        question_id: {
            type: Questions,
            resolve(parent, args) {
                return QuestionModel.findById({ _id: parent.question_id.toString() })
            }
        }
    })
})

//ROOT QUERY TYPE
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        questions: {
            type: new GraphQLList(Questions),
            resolve(parent, args) {
                return QuestionModel.find({})
            }
        },

        question: {
            type: Questions,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return QuestionModel.findById({ _id: args.id})
            }
        },

        users: {
            type: new GraphQLList(Users),
            resolve(parent, args) {
                return UserModel.find({})
            }
        },

        user: {
            type: Users,
            args: {email: { type: GraphQLString }},
            resolve(parent, args) {
                return UserModel.findOne({email: args.email})
            }
        },

        options: {
            type: new GraphQLList(Options),
            resolve(parent, args) {
                return OptionModel.find({})
            }
        },

        userAnswer: {
            type: new GraphQLList(UserAnswers),
            args: { user_id: { type: GraphQLID} },
            resolve(parent, args) {
                return UserAnswerModel.find({user_id: args.user_id})
            }
        }
    }
})


//MUTATION
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: Users,
            args: { email: {type: new GraphQLNonNull(GraphQLString)}},
            resolve(parent, args) {
                let newUser = new UserModel({
                    email: args.email
                })
                return newUser.save()
            }
        },

        addQuestion: {
            type: Questions,
            args: { question: { type: new GraphQLNonNull(GraphQLString)}},
            resolve(parent, args) {
                let newQuestion = new QuestionModel({
                    question: args.question
                })
                return newQuestion.save()
            }
        },

        addOption: {
            type: Options,
            args: { 
                question_id: { type: new GraphQLNonNull(GraphQLID)},
                option: { type: new GraphQLNonNull(GraphQLString)},
                correct: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let AddedOption = new OptionModel({
                    question_id: args.question_id,
                    option: args.option,
                    correct: args.correct
                })
                return AddedOption.save()
            }
        },

        addAnswer: {
            type: UserAnswers,
            args: {
                question_id: { type: new GraphQLNonNull(GraphQLID)},
                user_id: { type: GraphQLID},
                option: { type: GraphQLString},
                points: { type: GraphQLInt}
            },
            resolve(parent, args) {
                let user_answer = new UserAnswerModel({
                    question_id: args.question_id,
                    user_id: args.user_id,
                    option: args.option,
                    points: args.points
                })
                return user_answer.save()
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})