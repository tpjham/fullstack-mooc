import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("Renders content", () => {
  const blog = {
    title: "Testing with testing library",
    author: "Test Library",
    url: "testinglibrarby.com",
    likes: 0,
    user: null
  }

  const component = render(
    <Blog blog={blog} />
  )

  //Tapa 1
  expect(component.container).toHaveTextContent(
    "Testing with testing library"
  )

  //Tapa 2
  const element = component.getByText(
    "Testing with testing library"
  )
  expect(element).toBeDefined()

  //Tapa 3
  const div = component.container.querySelector(".blog")
  expect(div).toHaveTextContent(
    "Testing with testing library"
  )
})