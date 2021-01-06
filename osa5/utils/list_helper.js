const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likesTotal = 0

  if (blogs.length === 1) {
    return blogs[0].likes
  }

  for (const blog of blogs) {
    likesTotal += blog.likes
  }

  return likesTotal
}

const favouriteBlog = (blogs) => {
  let bestBlog = blogs[0]

  for (const blog of blogs) {
    if ( bestBlog.likes < blog.likes ) {
      bestBlog = blog
    }
  }

  return bestBlog
}

const mostBlogs = (blogs) => {
  let authorNames = [...new Set(blogs.map(blog => blog.author))]

  let blogAmounts = []

  for (const author of authorNames) {
    let tmpBlogs = blogs.filter(blog => blog.author === author)
    let tmp = {
      "author": author,
      "blogs": tmpBlogs.length
    }

    blogAmounts.push(tmp)
  }

  let most = Math.max(...Object.values(blogAmounts).map(o => o.blogs))

  return blogAmounts[Object.keys(blogAmounts).filter(o => blogAmounts[o].blogs === most)]
}

const mostLikes = (blogs) => {
  let authorNames = [...new Set(blogs.map(blog => blog.author))]

  let likeAmounts = []

  for (const author of authorNames) {
    let tmpBlogs = blogs.filter(blog => blog.author === author)
    let tmp = {
      "author": author,
      "likes": 0
    }

    for (const blog of tmpBlogs) {
      tmp.likes += blog.likes
    }

    likeAmounts.push(tmp)
  }

  let most = Math.max(...Object.values(likeAmounts).map(o => o.likes))

  return likeAmounts[Object.keys(likeAmounts).filter(o => likeAmounts[o].likes === most)]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}