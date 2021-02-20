const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const url = "mongodb+srv://admin:123@cluster0.v4bsb.mongodb.net/database?retryWrites=true&w=majority"
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

// models 
const Users = mongoose.model('users', userSchema)


let corsOptions = {
    origin: '*'
}
// use cors
app.use(cors(corsOptions))

// json body parser
app.use(express.json())

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to your database.')
}).catch((e) => {
    console.log(e)
})

// create a new user 
app.post('/users/register', async (req, res) => {
    let { firstname, lastname, username, password } = req.body
    try {
        let hashedPassword = await bcrypt.hash(password, 10)
        let user = new Users({
            firstname: firstname,
            lastname: lastname,
            username: username,
            password: hashedPassword
        })

        user.save()

        res.status(200).send(user)
    } catch (error) {
        return res.status(400).send('Error while registering a user')
    }
})

app.post('/users/login', (req, res) => {

})

app.listen(8000, () => {
    console.log('App is now listening on Port 8000')
})