describe (' render section page ' , () => {
  beforeEach(() => cy.visit('section'))

  it ('Should display AddSection feature' , () => {
    cy.get('[data-testid="add-section-component"]').should('exist').should('be.visible')
  })
})