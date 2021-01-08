import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [ newTitle, setNewTitle ] = useState("")
  const [ newAuthor, setNewAuthor ] = useState("")
  const [ newUrl, setNewUrl ] = useState("")

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }
  return (
    <div>
      <div>
        <h2>Add new blog</h2>
      </div>
      <form onSubmit={addBlog}>
        <div> Title: <input
          value={newTitle}
          onChange={handleTitleChange}
        /></div>
        <div> Author: <input
          value={newAuthor}
          onChange={handleAuthorChange}
        /></div>
        <div> URL: <input
          value={newUrl}
          onChange={handleUrlChange}
        /></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm