import React, { useState } from 'react'

const Blog = ({ blog, blogUpvote }) => {
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

  const blogInfo = () => (
    <div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.likes} <button onClick={upvoteBlog}>Like</button>
      </div>
      <div>
        {blogUser === null ?
          "" :
          blog.user.name}
      </div>
    </div>
  )

  return (
    <div>
      {blog.title} by {blog.author} <button onClick={() => toggleShowInfo(!showInfo)}>
        {showInfo ?
          "Hide" :
          "Show"}
      </button>
      {showInfo ?
        blogInfo() :
        ""
      }
    </div>
  )
}

export default Blog
