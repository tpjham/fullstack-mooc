describe("Blog ", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "Testy McGee",
      username: "tegee",
      password: "sekret"
    }
    cy.request("POST", "http://localhost:3001/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Front page can be opened", function() {
    cy.contains("Blogs")
  })

  it("Login form can be opened", function() {
    cy.contains("login").click()
  })

  describe("Login", function() {

    it("Login fails with wrong password", function() {
      cy.contains("login").click()
      cy.get("#username").type("tegee")
      cy.get("#password").type("wrong")
      cy.get("#login-button").click()

      cy.get(".error").contains("Wrong credentials")
    })

    it("User can login", function() {
      cy.contains("login").click()
      cy.get("#username").type("tegee")
      cy.get("#password").type("sekret")
      cy.get("#login-button").click()

      cy.contains("Logged in as Testy McGee")
    })

    describe("When logged in", function() {
      beforeEach(function() {
        cy.contains("login").click()
        cy.get("#username").type("tegee")
        cy.get("#password").type("sekret")
        cy.get("#login-button").click()
      })

      it("A new blog can be added", function() {
        cy.contains("New blog").click()
        cy.get("#title").type("Cypress end-to-end testing")
        cy.get("#author").type("Cypress")
        cy.get("#url").type("127.0.0.1")
        cy.get("#submit-blog").click()
        cy.contains("Cypress end-to-end testing")
      })

      describe("And a blog exists", function() {
        beforeEach(function() {
          cy.contains("New blog").click()
          cy.get("#title").type("Cypress end-to-end testing")
          cy.get("#author").type("Cypress")
          cy.get("#url").type("127.0.0.1")
          cy.get("#submit-blog").click()
          cy.contains("Cypress end-to-end testing")
        })

        it("Blog can be liked", function() {
          cy.get(".blog").contains("Cypress end-to-end testing by Cypress")
            .contains("Show")
            .click()
          cy.contains("Likes: 0")
            .contains("Like")
            .click()

          cy.contains("1")
        })

        it("Blog can be removed", function() {
          cy.get(".blog").contains("Cypress end-to-end testing by Cypress")
            .contains("Show")
            .click()
          cy.contains("Remove blog")
            .click()
          cy.get(".blog").contains("Cypress end-to-end testing by Cypress").should("not.exist")
        })

        it("Blogs are displayed in order of most likes -> least likes", function() {
          //TODO: Get all blogs, compare found list with shown blogs to ensure blogs are in correct order

        })
      })
    })
  })
})