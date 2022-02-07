const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OptionSchema = new Schema({
    question_id: { type: Object, required: true },
    option: { type: String, required: true },
    correct: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model('Options', OptionSchema)