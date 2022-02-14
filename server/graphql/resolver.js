const UserModel = require('../models/user.model')
module.exports = {
    hello() {
        return {
            text: "Hello World",
            views: 1234
        }
    },

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
    }
}