describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('1. Should render sign-up', () => {
    cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
  });

  it('2. When user does not enter email, it should display error message', () => {
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('be.visible');
    cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('have.text', 'Valid email is required');
  });

  it('4. when user enters all values, it should navigate to login page', () => {
    cy.get('[data-cy=Sign-Up-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
    cy.url().should('include', '/signup');
  });
});
