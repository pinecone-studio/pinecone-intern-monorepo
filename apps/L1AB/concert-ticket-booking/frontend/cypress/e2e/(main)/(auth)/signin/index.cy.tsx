describe('SignIn-Page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });
  it('1. Should render signIn', () => {
    cy.get('[data-cy=SignIn-Page]').should('be.visible');
  });
  it('2. When user enters all values , it should navigate to main', () => {
    cy.get('[data-cy=SignIn-Email-Input]').type('test@gmail.com');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
  });
  it('3', () => {
    cy.get('[data-cy=SignIn-Password-Input]').type('test');
    cy.get('[data-cy=SignIn-Submit-Button]').click();
  });
});
