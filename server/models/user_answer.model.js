const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserAnswerSchema = new Schema({
    question_id: { type: Object, required: true },
    user_id: { type: Object, required: true },
    option: { type: String, required: true },
    points: { type: Number }
})

module.exports = mongoose.model('UsersAnswer', UserAnswerSchema)