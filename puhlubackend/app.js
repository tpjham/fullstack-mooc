const config = require("./utils/config")
const express = require("express")
const path = require("path")

const app = express()
const cors = require("cors")
const personRouter = require("./controllers/persons")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

logger.info("Connecting to ", config.MONGODB_URI)

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB: ", error.message)
  })


app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/persons", personRouter)

app.use(express.static(path.join(__dirname, "build")))

app.get("/puhlu", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
