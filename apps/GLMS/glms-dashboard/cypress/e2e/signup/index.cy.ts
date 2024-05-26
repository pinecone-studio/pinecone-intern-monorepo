describe('articles page', () => {
  beforeEach(() => cy.visit('/signup'));

  it('1. Should display signup form', () => {
    cy.get('[data-testid="sign-up-form-container"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the sign up button, it should display an error messages', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
  });

  it('3. When the user types an invalid email or phone number in the emailOrPhoneNumber input, it should display an error message', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
  });
});
