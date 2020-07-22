const express = require("express")
const app = express();
const morgan = require("morgan")

morgan.token("response", function getResp ( res ) {
  console.log(res.body);
  
  return JSON.stringify(res.body)
})

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :response"))

let persons = [
  {
    name: "Arto Hellas",
    number: "123145123",
    id: 1
  },
  {
    name: "Richie Rich",
    number: "7777777",
    id: 2
  },
  {
    name: "Donald Duck",
    number: "13131313",
    id: 3
  },
  {
    name: "Goofy",
    number: "1235123",
    id: 4
  }
]

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  
  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post("/api/persons", (request, response) => {
  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: "Name missing"
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number missing"
    })
  }

  const tmpPerson = persons.find(p => p.name === body.name)

  if (tmpPerson) {
    return response.status(400).json({
      error: "Name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(persons);
})

app.get("/info", (request, response) => {
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date().toString()}</p>
    </div>`
  )
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})
