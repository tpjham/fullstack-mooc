const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("../utils/test_helper")
const app = require("../app")
const api = supertest(app)
const bcrypt = require("bcrypt")

const Blog = require("../models/blog")
const User = require("../models/user")

describe("When initially saving some notes", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})


    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()

    await Blog.insertMany(helper.initialBlogs)
  })

  test("Notes are returned as JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("All notes are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("Specified blog is within the returned list", async () => {
    const response = await api.get("/api/blogs")

    const titles = response.body.map(r => r.title)

    expect(titles).toContain("Post test")
  })

  describe("Viewing a specific note", () => {

    test("A specific note can be viewed", async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    describe("Adding new blogs", () => {

      test("A valid note can be added", async () => {
        const usersAtStart = await helper.usersInDb()

        const userid = usersAtStart[0].id

        const newBlog = {
          title: "Added through test",
          author: "Async/Await",
          url: "jest",
          likes: 420,
          user: userid
        }

        let token = ""

        await api
          .post("/api/login")
          .send({
            username: "root",
            password: "sekret"
          })
          .expect((res) => {
            token = res.body.token
          })
          .expect(200)

        await api
          .post("/api/blogs")
          .set("Authorization", `bearer ${token}`)
          .send(newBlog)
          .expect(200)
          .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain("Added through test")
      })

      test("Blog can't be added without authorization header in request", async () => {
        const usersAtStart = await helper.usersInDb()

        const userid = usersAtStart[0].id

        const newBlog = {
          author: "Async/Await",
          url: "jest",
          likes: 420,
          user: userid
        }

        await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test("Blog without title is not added", async () => {
        const usersAtStart = await helper.usersInDb()

        const userid = usersAtStart[0].id

        const newBlog = {
          author: "Async/Await",
          url: "jest",
          likes: 420,
          user: userid
        }

        let token = ""

        await api
          .post("/api/login")
          .send({
            username: "root",
            password: "sekret"
          })
          .expect((res) => {
            token = res.body.token
          })
          .expect(200)

        await api
          .post("/api/blogs")
          .set("Authorization", `bearer ${token}`)
          .send(newBlog)
          .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      })

      test("Blog has identifying \"id\" field", async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect("Content-Type", /application\/json/)

        expect(resultBlog.body.id).toBeDefined()

      })

      test("Blog with no likes has likes set to 0 on post", async () => {
        const usersAtStart = await helper.usersInDb()

        const userid = usersAtStart[0].id

        const newBlog = {
          title: "Added through test",
          author: "Async/Await",
          url: "jest",
          likes: null,
          user: userid
        }

        let token = ""

        await api
          .post("/api/login")
          .send({
            username: "root",
            password: "sekret"
          })
          .expect((res) => {
            token = res.body.token
          })
          .expect(200)

        await api
          .post("/api/blogs")
          .set("Authorization", `bearer ${token}`)
          .send(newBlog)
          .expect(200)
          .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        console.log(blogsAtEnd[blogsAtEnd.length - 1])


        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
      })

      describe("Deleting blogs", () => {

        test("A blog can be deleted", async () => {
          const usersAtStart = await helper.usersInDb()

          const userid = usersAtStart[0].id

          const newBlog = {
            title: "Added through test",
            author: "Async/Await",
            url: "jest",
            likes: 420,
            user: userid
          }

          let token = ""

          await api
            .post("/api/login")
            .send({
              username: "root",
              password: "sekret"
            })
            .expect((res) => {
              token = res.body.token
            })
            .expect(200)


          await api
            .post("/api/blogs")
            .set("Authorization", `bearer ${token}`)
            .send(newBlog)

          const tempBlogs = await helper.blogsInDb()
          const blog = tempBlogs[tempBlogs.length - 1]

          await api
            .delete(`/api/blogs/${blog.id}`)
            .set("Authorization", `bearer ${token}`)
            .expect(204)

          const blogsAtEnd = await helper.blogsInDb()

          expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

          const titles = blogsAtEnd.map(r => r.title)

          expect(titles).not.toContain(blog.title)
        })
      })
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})