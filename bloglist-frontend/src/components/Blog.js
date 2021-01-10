import React, { useState } from "react"

const Blog = ({ blog, blogUpvote, blogRemove }) => {
  const [ showInfo, toggleShowInfo ] = useState(false)

  const blogUser = blog.user

  const upvoteBlog = (event) => {
    event.preventDefault()
    blogUpvote(blog.id, {
      id: blog.id,
      user: (blog.user === null ?
        "" :
        blog.user),
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
  }

  const removeBlog = (event) => {
    event.preventDefault()

    blogRemove(blog)
  }

  const blogInfo = () => (
    <div>
      <div id="url">
        {blog.url}
      </div>
      <div id="likes">
        Likes: {blog.likes} <button onClick={upvoteBlog}>Like</button>
      </div>
      <div id="user">
        {blogUser === null ?
          "No user" :
          blog.user.name}
      </div>
      <div>
        <button id="remove-blog" onClick={removeBlog}> Remove blog </button>
      </div>
    </div>
  )

  return (
    <li className="blog">
      {blog.title} by {blog.author} <button onClick={() => toggleShowInfo(!showInfo)}>
        {showInfo ?
          "Hide" :
          "Show"}
      </button>
      {showInfo ?
        blogInfo() :
        ""
      }
    </li>
  )
}

export default Blog
