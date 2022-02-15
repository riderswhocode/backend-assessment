const UserModel = require('../models/user.model')
const QuestionModel = require('../models/question.model')
const OptionModel = require('../models/option.model')
const AnswerModel = require('../models/user_answer.model')

module.exports = {
    addUser: async function(args, req) {
        const email = args.userInput.email
        const existingUser = await UserModel.findOne({email: email})
        if (!existingUser) {
            const user = new UserModel({
                email: email
            })
            const createdUser = await user.save()
            return createdUser
        }

        if (existingUser) {
            return existingUser
        }
    },

    questions: async function() {
        const questions = await QuestionModel.find({})
        // return questions
        return questions.map(async q => {
            const options = await OptionModel.find({question_id: q._id.toString()})
            return {
                ...q._doc,
                _id: q._id.toString(),
                options: options
            }
        })
    },

    addQuestion: async function(args, req) {
        const newQuestion = new QuestionModel({
            question: args.userInput.question
        })
        const created = newQuestion.save()
        return created
    },

    addAnswers: async function(args, req) {
        const addOptions = new OptionModel({
            option: args.userInput.option,
            correct: args.userInput.correct,
            question_id: args.userInput.question_id

        })
        addOptions.save()
        const Question = await QuestionModel.findById({_id: args.userInput.question_id})
        const Options = await OptionModel.find({question_id: args.userInput.question_id})
        return {
            ...Question._doc,
            options: Options
        }
    },

    saveUserAnswer: async function(args, req) {
        const answer = new AnswerModel({
            option: args.userInput.option,
            points: args.userInput.points,
            question_id: args.userInput.question_id.toString(),
            user_id: args.userInput.user_id.toString()
        })
        const newAnswer = answer.save()
        return newAnswer
    }
}