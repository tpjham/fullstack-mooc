import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/loginService"
import Alert from "./components/Alert";
import BlogForm from "./components/BlogForm"
import LoginForm from './components/LoginForm';
import Togglable from "./components/Togglable"

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ message, setMessage ] = useState(null)
  const [ alertStyle, setAlertStyle ] = useState(null)
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response))
        setMessage(`Added ${blogObject.title} by ${blogObject.author}`)
        setAlertStyle("notification")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`Validation failed: ${error.response.data.error}`)
        setAlertStyle("error")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
        console.log(error.response.data)
      })
  }

  const blogUpvote = (id, upvotedBlog) => {
    blogService
      .update(id, upvotedBlog)
      .then(response => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : upvotedBlog))
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        "loggedBlogAppUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch ( exception ) {
      setMessage("Wrong credentials")
      setAlertStyle("error")
      setTimeout(() => {
        setMessage(null)
        setAlertStyle(null)
      }, 5000 )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    window.location.reload()
  }

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      <Alert message={message} alertStyle={alertStyle} />

      <h2>Blogs</h2>
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <p>
          Logged in as {user.name}
          <button onClick={handleLogout}>
            Logout
          </button>
        </p>
        <div>
          {blogForm()}
        </div>
        {blogs.sort((a,b) => {
          if ( a.likes > b.likes ) return -1
          if ( a.likes < b.likes ) return 1
          return 0
        }).map(blog =>
          <Blog key={blog.id} blog={blog} blogUpvote={blogUpvote} />
        )}
      </div>}
    </div>
  )
}

export default App