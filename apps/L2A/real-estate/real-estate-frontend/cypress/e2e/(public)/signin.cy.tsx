describe('Sign In', () => {
  beforeEach(()=>{
    cy.visit('/signin')
  })

  it('should display the sign-in form',()=>{
    cy.get('[data-cy=email-input]').should('exist')
    cy.get('[data-cy=password-input]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('should show error message for invalid credentials', () => {
    cy.get('[data-cy=email-input]').type('wrong@example.com')
    cy.get('[data-cy=password-input]').type('12')
    cy.get('button[type="submit"]').click()

    cy.get('[data-cy="error message"]').should('contain','Login failed')
  }
)})