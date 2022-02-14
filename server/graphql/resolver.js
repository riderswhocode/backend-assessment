const UserModel = require('../models/user.model')
const QuestionModel = require('../models/question.model')
const OptionModel = require('../models/option.model')

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
    }
}