const express = require('express')
const cors = require('cors')

const app = express()

var corsOptions = {
    // tell cors to allow only requests from this origin
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) doesn't work on 204
}
// tell express to always parse body from client 
app.use(express.json()); 
// tell express to use cors
app.use(cors(corsOptions))
// mock data
let todos = [
    {
        "id": 1,
        "title": "Todo Title 1",
    },
    {
        "id": 2,
        "title": "Todo Title 2",
    },
    {
        "id": 3,
        "title": "Todo Title 3",
    }
]

// @GET to get data
app.get('/', (req, res) => {
    res.status(200).send(todos)
})

// @PUT to update existing data
app.get('/', (req, res) => {
    // to be implemented
})

// @POST to post new data
app.post('/addTodo', (req, res) => {
   let title = req.body.title
   console.log(title)
   let id = Math.random()
   todos.push({
       title,
       id
   })
   res.redirect('/')
})

// @DELETE to delete existing data
app.delete('/deleteTodo', (req, res) => {
    let id = req.body.id
    let newTodos = todos.filter(todo => todo.id != id);
    todos = newTodos
    res.status(200).send(todos)
})

app.listen(3000, () => {
    console.log('App is listening on port 3000')
})