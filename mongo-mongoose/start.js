const express = require('express')
const cors = require('cors')
const app = express()

// mongoose
const mongoose = require('mongoose')

// user controllers
const userRoutes = require('./controllers/User.js')

let port = 3000

// database url
let url = "mongodb+srv://admin:admin123@cluster0.8k9ay.mongodb.net/schema?retryWrites=true&w=majority"

// connect to db
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(() => {
    console.log('db connection is successful')
}).catch(() => {
    console.log("error connecting to the db")
})


app.use(cors())

app.use(express.json())

// prefix userRoutes with /user
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log('App is listening on port ' + port)
})