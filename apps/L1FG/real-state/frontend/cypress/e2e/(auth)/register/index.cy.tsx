describe('Register Page Tests', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('1. should be successful register ', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Name-Input"]').type('aaaaaaaa');
    cy.get('[data-cy="Register-Page-Email-Input"]').type('12345678');
    cy.get('[data-cy="Register-Page-Phone-Input"]').type('12345678');
    cy.get('[data-cy="Register-Page-Password-Input"]').type('12345678');
    cy.get('[data-cy="Register-Page-Confirm-Password-Input"]').type('12345678');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.visit('/');
  });

  it('2. should type into the name input', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Name-Input"]').type('12');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.get('[data-cy="Register-Page-Name-Error-Message"]').should('be.visible');
  });

  it('3. should type into the email input', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Email-Input"]').type('12');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.get('[data-cy="Register-Page-Email-Error-Message"]').should('be.visible');
  });
  it('4. should type into the phone input', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Phone-Input"]').type('12');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.get('[data-cy="Register-Page-Phone-Error-Message"]').should('be.visible');
  });

  it('5. should type into the password input', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Password-Input"]').type('12');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.get('[data-cy="Register-Page-Password-Error-Message"]').should('be.visible');
  });

  it('6. should type into the password input', () => {
    cy.get('[data-cy="Register-Page"]').should('exist');
    cy.get('[data-cy="Register-Page-Confirm-Password-Input"]').type('12');
    cy.get('[data-cy="Register-Page-Submit-Button"]').click();
    cy.get('[data-cy="Register-Page-Confirm-Password-Error-Message"]').should('be.visible');
  });

  it('5. should be go login', () => {
    cy.get('[data-cy="Register-Page-To-Login-Page"]').click();
    cy.visit('/login');
  });
});
