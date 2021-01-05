const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const logger = require("../utils/logger")
const blog = require("../models/blog")

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post("/", async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // console.log(request.token)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)

  if ( request.body.likes === null || !request.body.likes >= 0 || !request.body.likes) {
    request.body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  if ( blog.title && blog.url ) {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.json(savedBlog.toJSON())
  } else {
    response.status(400).end()
  }
})

blogRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if ( blog ) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete("/:id", async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  // console.log(request.token)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" })
  }
  const userid = decodedToken.id
  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === userid.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: "Unauthorized access, are you sure you're trying to delete your own blog?" })
  }
})

blogRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.status(200).end()
})

module.exports = blogRouter