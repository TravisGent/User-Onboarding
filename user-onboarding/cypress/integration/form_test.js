describe("My First Test", function() {
    it("Visits the page", function() {
        cy.visit("http://localhost:3000/")
        cy.get("input[name=name]").type("Travis")
        cy.get("input[name=email]").type("filler@filler.com")
        cy.get("input[name=password]").type("travis")
        cy.get("input[name=terms]").check()
        cy.get("button").click()
        cy.get("input[name=name]").should("have.value", "Travis")
        .pause()
    })
})
describe("My Second Test", function() {
    it("Submits an Empty Form", function() {
        cy.visit("http://localhost:3000/")
        cy.get("button").click()
    })
})