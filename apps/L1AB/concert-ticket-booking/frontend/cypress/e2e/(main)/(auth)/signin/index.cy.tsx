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
  // it('4', () => {
  //   cy.get('[data-cy=SignIn-Password-Input]').type('test');
  //   cy.get('[data-cy=SignIn-Password-Input-Icons]').click();
  // });
  // it('Should toggle password visibility when the toggle button is clicked', () => {
  //   cy.get('[data-cy=SignIn-Password-Input]').type('password123');

  //   cy.get('[data-cy=SignIn-Password-Input]').should('have.attr', 'type', 'password');

  //   cy.get('[data-cy=SignIn-Password-Input-Icons]').click();

  //   cy.get('[data-cy=SignIn-Password-Input]').should('have.attr', 'type', 'text');

  //   cy.get('[data-cy=SignIn-Password-Input-Icons]').click();

  //   cy.get('[data-cy=SignIn-Password-Input]').should('have.attr', 'type', 'password');
  // });
});
