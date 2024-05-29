const testEmailAddress = 'pineconeTestUser@gmail.com';

describe('articles page', () => {
  beforeEach(() => cy.visit('/signup'));

  it('1. Should display signup form', () => {
    cy.get('[data-testid="sign-up-form-container"]').should('exist').should('be.visible');
  });
  it('2. When user enters no value on the inputs and click on the sign up button, it should display an error messages', () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('exist');
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="email"]').click().get('input[name="number"]').click();
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Имэйл хаягаа оруулна уу');
    cy.get('input[name="number"]').click().get('input[name="password"]').click();
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Утасны дугаараа оруулна уу');
    cy.get('input[name="password"]').click().get('input[name="confirmPassword"]').click();
    cy.get('[data-testid="helperText"]').eq(2).should('exist').should('contain', 'Нууц үгээ оруулна уу');
  });
  it("4. When user clicks on the signup button, it should create already signed user and shows 'Адаа гарлаа' message", () => {
    cy.get('[data-cy="Sign-Up-Button"]').should('be.disabled');
    cy.get('input[name="email"]').type('hadabagi85@gmail.com');
    cy.get('input[name="number"]').type('12345678');
    cy.get('input[name="password"]').type('1');
    cy.get('input[name="confirmPassword"]').type('1');
    cy.get('[data-cy="Sign-Up-Button"]').should('not.be.disabled');
    cy.get('[data-cy="Sign-Up-Button"]').click();
    cy.contains('Алдаа гарлаа').should('be.visible');
  });
});
