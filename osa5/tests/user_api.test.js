const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("../utils/test_helper")

describe("When there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("Creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "tesGee",
      name: "Testy McGee",
      password: "testing",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  describe("Adding new users", () => {

    test("Creating new users fails if username already taken", async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: "root",
        name: "Superuser",
        password: "salaisuus"
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(result.body.error).toContain("`username` to be unique")

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test("Creating new user fails if password length is lower than 3", async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: "test",
        name: "Testy",
        password: "sa"
      }

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      expect(result.body.error).toContain("Password too short")

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
