const mongoose = require("mongoose");

if ( process.argv.length < 3 ) {
    console.log("Give a password as an argument")
    process.exit(1);
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.z8qsq.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
    content: "HTML is Easy",
    date: new Date(),
    important: true,
})

note.save().then(response => {
    console.log("Note saved");
    mongoose.connection.close();    
})