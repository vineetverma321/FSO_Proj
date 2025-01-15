const http = require('http')
const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})


app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note=> note.id === id)
    
    if(note) {
        response.json(note)}
        else {response.status(404).end()}
})

const generateID= () => {
    const maxID = notes.length > 0 ? Math.max(...notes.map(n=> Number(n.id))) : 0
    return String(maxID + 1)
}

app.post('/api/notes', (request, response)=> {
    const body = request.body

    if(!body.content) {
       return response.status(400).json({
            Error: "content not provided"
    })
    }
    
const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id:generateID()
}

    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)