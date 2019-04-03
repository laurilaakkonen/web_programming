const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
]

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const newId = (Math.floor(Math.random() * 500) + 1)
  return newId
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log("testing1... " + persons[1].name)
  console.log("testing1... " + body.name)
  console.log("testing1... " + body.number)

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "Content missing!" })
  }

  var i;
  for (i = 0; i < persons.length; i++) {
    if (body.name == persons[i].name) {
      console.log(body.name)
      console.log("already exists... " + persons[i].name)
      return response.status(406).json({ error: "Name already exists!" })
    }
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  console.log("adding... " + body.name + " " + body.number)
  persons = persons.concat(person)

  response.json(person)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})