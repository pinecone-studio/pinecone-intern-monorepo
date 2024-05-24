describe('articles page', () => {
  beforeEach(() => cy.visit('/sign-in'));

  it('1. Should display signin form', () => {
    cy.get('[data-testid="sign-in-form-container"]').should('exist').should('be.visible');
  });

  it('2. When user enters no value on the inputs and click on the sign in button, it should display an error messages', () => {
    cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үгээ оруулна уу');
  });

  it('3. When the user types an invalid email or phone number in the emailOrPhoneNumber input, it should display an error message', () => {
    cy.get('[data-cy="Sign-In-Button"]').should('exist').click();
    cy.get('[data-cy="Sign-In-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
  });
});
