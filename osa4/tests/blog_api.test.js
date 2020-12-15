const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("../utils/test_helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")

describe("When initially saving some notes", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

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
        const newBlog = {
          title: "Added through test",
          author: "Async/Await",
          url: "jest",
          likes: 420
        }

        await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(200)
          .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain("Added through test")
      })

      test("Blog without title is not added", async () => {
        const newBlog = {
          author: "Testy McGee",
          likes: 1
        }

        await api
          .post("/api/blogs")
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
        const newBlog = {
          title: "Testing likes set",
          author: "Async/Await",
          url: "jest",
          likes: null
        }

        await api
          .post("/api/blogs")
          .send(newBlog)
          .expect(200)
          .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        console.log(blogsAtEnd[blogsAtEnd.length - 1])


        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
      })

      describe("Deleting blogs", () => {

        test("A blog can be deleted", async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]

          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

          const blogsAtEnd = await helper.blogsInDb()

          expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

          const titles = blogsAtEnd.map(r => r.title)

          expect(titles).not.toContain(blogToDelete.title)
        })
      })
    })
  })
})
afterAll(() => {
  mongoose.connection.close()
})