import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
//import { prettyDom } from "@testing-library/dom"
import Blog from "./Blog"

describe("<Togglable />", () => {
  let component

  let mockHandler = jest.fn()

  const blog = {
    title: "Testing with testing library",
    author: "Test Library",
    url: "testinglibrarby.com",
    likes: 0,
    user: null
  }

  beforeEach(() => {
    component = render(
      <Blog blog={blog} blogUpvote={mockHandler} />
    )
  })

  test("Renders title and author only as default", () => {

    //Tapa 1
    expect(component.container).toHaveTextContent(
      "Testing with testing library by Test Library"
    )
    // expect(component.container).toHaveTextContent(
    //   "Test Library"
    // )

    //Tapa 2
    // const element = component.getByText(
    //   "Testing with testing library"
    // )
    // expect(element).toBeDefined()

    //Tapa 3
    // const div = component.container.querySelector(".blog")
    // expect(div).toHaveTextContent(
    //   "Testing with testing library"
    // )

    // const div2 = component.container.querySelector("li")
    // console.log(prettyDom(div2))
  })

  test("Clicking the button also shows rest of the info", () => {
    const button = component.getByText("Show")
    fireEvent.click(button)

    const url = component.container.querySelector("#url")
    const likes = component.container.querySelector("#likes")

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test("Clicking the like button twice works", async () => {

    const button = component.getByText("Show")
    fireEvent.click(button)
    const button2 = component.getByText("Like")
    fireEvent.click(button2)
    fireEvent.click(button2)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})