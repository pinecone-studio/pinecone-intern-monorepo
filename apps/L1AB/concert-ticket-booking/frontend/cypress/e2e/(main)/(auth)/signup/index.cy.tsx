describe('Sign-Up-Page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });
  it('1. Should render signup', () => {
    cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
  });
  it('2. When user enters all values ', () => {
    cy.get('[data-cy=Sign-Up-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
  });
  it('3. Should allow the user to input password and submit', () => {
    cy.get('[data-cy=Sign-Up-Password-Input]').type('test');
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
  });
  it('4. Should validate matching passwords before submitting', () => {
    cy.get('[data-cy=Sign-Up-Password-Input]').type('test');
    cy.get('[data-cy=Sign-Up-Confirm-Password-Input]').type('test');
    cy.get('[data-cy=Sign-Up-Submit-Button]').click();
  });
  it('5. Should toggle password visibility using eye icon', () => {
    cy.get('[data-cy=Sign-Up-Password-Input]').type('test');
    cy.get('[data-cy=Sign-Up-Password-Input-Icons]').click();
  });
  it('6. Should toggle confirm password visibility using eye icon', () => {
    cy.get('[data-cy=Sign-Up-Confirm-Password-Input]').type('test');
    cy.get('[data-cy=Sign-Up-Confirm-Password-Input-Icons]').click();
  });

  it('7. Should navigate to the Sign-In page when the link is clicked', () => {
    cy.get('[data-cy=Sign-Up-Link]').click();
    cy.url().should('include', '/signin');
  });
});
