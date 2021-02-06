const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // firstname & lastname
    firstname: {
        type: String
    },
    lastname: String,
    created_at: { type: Date, default: Date.now },
})


const User = mongoose.model('users', userSchema)

module.exports = {
    User
}