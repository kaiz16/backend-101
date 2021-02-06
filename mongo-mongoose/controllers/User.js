const express = require('express')
const { User } = require('../models/User.js')
const userRoutes = express.Router()

userRoutes.post('/createUser', (req, res) => {
    const structure = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    let user = new User(structure)
    // informing model
    user.save()

    // informing view
    res.send(user)
})

userRoutes.get('/getUsers', (req, res) => {
    User.find().then(data => {
        res.send(data)
    })
})

userRoutes.get('/getUserById', (req, res) => {
    // find by id
    User.find({ _id: req.body.id }).then(data => {
        res.send(data)
    })
})

module.exports = userRoutes