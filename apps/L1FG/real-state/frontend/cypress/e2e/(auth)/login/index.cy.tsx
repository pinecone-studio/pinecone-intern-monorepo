describe('Login Page Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('1. should be successful login ', () => {
    cy.get('[data-cy="Login-Page"]').should('exist');
    cy.get('[data-cy="Login-Page-Email-Input"]').type('aaaaaaaa');
    cy.get('[data-cy="Login-Page-Password-Input"]').type('12345678');
    cy.get('[data-cy="Login-Page-Submit-Button"]').click();
    cy.visit('/');
  });

  it('2. should type into the email input', () => {
    cy.get('[data-cy="Login-Page"]').should('exist');
    cy.get('[data-cy="Login-Page-Email-Input"]').type('12');
    cy.get('[data-cy="Login-Page-Submit-Button"]').click();
    cy.get('[data-cy="Login-Email-Input-Error-Message"]').should('be.visible');
  });

  it('3. should type into the password input', () => {
    cy.get('[data-cy="Login-Page"]').should('exist');
    cy.get('[data-cy="Login-Page-Password-Input"]').type('12');
    cy.get('[data-cy="Login-Page-Submit-Button"]').click();
    cy.get('[data-cy="Login-Email-Input-Error-Message"]').should('be.visible');
  });

  it('4. should be go register', () => {
    cy.get('[data-cy="Login-Page-To-Forget-Password-Button"]').click();
    cy.visit('/register');
  });
  it('5. should be go register', () => {
    cy.get('[data-cy="Login-Page-To-Register-Button"]').click();
    cy.visit('/forget-password');
  });
});
