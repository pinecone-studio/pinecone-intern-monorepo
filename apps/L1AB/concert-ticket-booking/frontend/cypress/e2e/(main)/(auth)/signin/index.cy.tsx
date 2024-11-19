describe('Sign-In-Page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });
  it('1. Should render signIn', () => {
    cy.get('[data-cy=Sign-In-Page]').should('be.visible');
  });
  it('2. When user enters all values , it should navigate to main', () => {
    cy.get('[data-cy=Sign-In-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
  });
  it('3', () => {
    cy.get('[data-cy=Sign-In-Password-Input]').type('test');
    cy.get('[data-cy=Sign-In-Submit-Button]').click();
  });
  it('4', () => {
    cy.get('[data-cy=Sign-In-Password-Input]').type('test');
    cy.get('[data-cy=Sign-In-Password-Input-Icons]').click();
  });
});
