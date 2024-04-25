describe('AddSection feature', () => {
  beforeEach(() => {
    cy.visit('/section') 
  })

  it('should render Addsection feature', () => {
     cy.get('[data-testid="add-section-component"]').should('exist').should('be.visible')
    });

    it('should fill title input', () => {
      cy.get('[data-testid="add-section-title-input"]').should('be.visible').type('Html')
    })
  
    it('should fill description input', () => {
      cy.get('[data-testid="add-section-description-input"]').should('be.visible').type('Html intro')
    })
  
    it('button should be clicked', () => {
      cy.get('[data-cy="add-section-handle-btn"]').click()
    })
  
})
