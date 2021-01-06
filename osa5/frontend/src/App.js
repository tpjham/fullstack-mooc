import {useEffect, useState} from "react"
import loginService from "./services/loginService"
import blogService from "./services/blogService"
import Alert from "./components/Alert";

const App = () => {
  const [ blogs, setBlogs  ] = useState([]);
  const [ showAll, setShowAll ] = useState(true);
  const [ message, setMessage ] = useState(null)
  const [ alertStyle, setAlertStyle ] = useState(null)
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    
    for (const key of blogs) {  
          blogService
            .then(response => {
              setBlogs(blogs.map(blog => blog.title !== blog.title ? blog : response))
              setMessage(`Changed the number for `)
              setAlertStyle("notification")
              setTimeout( () => {
                setMessage(null)
                setAlertStyle(null)
              }, 5000)
            })
            .catch(error => {
              setMessage(
                `Information of  has already been removed from the server`
              )
              setAlertStyle("error")
              setTimeout(() => {
                setMessage(null)
                setAlertStyle(null)
              }, 5000)
            })
        return;
    }

    // const personObject = {
    //   name: newName,
    //   number: newNumber,
    // }

    blogService
      .then(response => {
        setBlogs(blogs.concat(response))
        setMessage(`Added`)
        setAlertStyle("notification")
        setTimeout( () => {
          setMessage(null)
          setAlertStyle(null)
        }, 5000)
        console.log(response)
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

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.title.toLowerCase())

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form> 
  )

  const noteForm = () => {
    <form onSubmit={setShowAll}>
      <input
        value={user}
        onChange={handleLogin}
      />
    </form>
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

  return (
    <div>
      <h1>Blogs</h1>
      <Alert message={message} alertStyle={alertStyle} />
      
      { user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

      <h2>Blogs</h2>

    </div>
  )
}

export default App