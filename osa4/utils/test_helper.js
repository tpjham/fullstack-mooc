const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "Post test",
    author: "Testy McGee",
    url: "String",
    likes: 69,
    user: "5ff40f57786a06202001b3f4"
  },
  {
    title: "Post test2",
    author: "Testy McGee2",
    url: "String",
    likes: 69,
    user: "5ff40f57786a06202001b3f4"
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "Removed soon", author: "Doesntmatter", url: "whocares", likes: 1 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}