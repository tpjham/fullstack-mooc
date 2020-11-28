const mongoose = require("mongoose")

if ( process.argv.length < 3 ) {
  console.log("Give a password as an argument")
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.z8qsq.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model("Person", personSchema)

if ( process.argv.length === 3) {
  console.log("Phonebook:")

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

if ( process.argv.length === 5 ) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(response => {
    console.log(`Added ${person.name} with the number ${person.number} to the phonebook`)
    mongoose.connection.close()
  })
}