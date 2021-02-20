const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()

const url = process.env.MongoDB
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY
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
    origin: '*' // allow from anywhere
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

function verifyToken(req, res, next) {
    const token = req.headers['authorization']
    try {
        let verification = jwt.verify(token, SECRET_JWT_KEY)
        req.user = verification
        next()
    } catch (error) {
        res.status(400).send(error)
    }
}
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

app.post('/users/login', async (req, res) => {
    let { username, password } = req.body
    let user = await Users.findOne({ username: username })
    
    if (!user) {
        return res.status(400).send("Please register first.")
    }


    let matchedPassword = await bcrypt.compare(password, user.password)
    if(!matchedPassword) {
        return res.status(400).send("Password is wrong.")
    }

    let payload = {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        created_at: user.created_at
    }

    let token = jwt.sign(payload, SECRET_JWT_KEY, {
        expiresIn: '1h'
    })

    res.status(200).json({
        token: token
    })
})

app.get('/users', verifyToken, async (req, res) => {
    let users = await Users.findOne({ username: req.user.username })

    res.status(200).send(users)
})


app.listen(8000, () => {
    console.log('App is now listening on Port 8000')
})