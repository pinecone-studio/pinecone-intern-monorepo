describe ("It should render section page" , () => {
    beforeEach(() => {
        cy.visit("/section")
    })
}) 

it ("Should display AddSection component" , () => {
    cy.get('[data-cy="add-section-component"]').should("exist").should('be.visible')
})