describe('articles page', () => {
  beforeEach(() => cy.visit('/reset-password'));

  it('1. Should display reset-form-1', () => {
    cy.get('[data-testid="reset-form1-form-container"]').should('exist').should('be.visible');
  });

  it('2. When user enters no value on the inputs and click on the sign in button, it should display an error messages', () => {
    cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form1-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
  });

  it('3. When the user types an invalid email or phone number in the emailOrPhoneNumber input, it should display an error message', () => {
    cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form1-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('input[name="emailOrPhoneNumber"]').type('1234');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг байх ёстой');
  });

  it('4. When user types on the emailOrPhoneNumber input, an error message should disappear', () => {
    cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form1-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', 'Утас эсвэл имэйл хаяг оруулна уу');
    cy.get('input[name="emailOrPhoneNumber"]').type('pinecone10k@gmail.com');
    cy.contains('Утас эсвэл имэйл хаяг оруулна уу').should('not.exist');
    cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
  });

  it('5. Should display reset-form-2', () => {
    cy.get('[data-testid="reset-form2-form-container"]').should('exist').should('be.visible');
  });

  it('6. When user enters no value on the inputs and click on the reset-form2 button, it should display an error messages', () => {
    cy.get('[data-cy="Reset-Form2-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form2-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үг сэргээх кодоо оруулна уу');
  });

  it('7. When user types on the OTP input, an error message should disappear', () => {
    cy.get('[data-cy="Reset-Form2-Button"]').should('exist').click();
    cy.get('[data-cy="Reset-Form2-Button"]').should('be.disabled');
    cy.get('[data-testid="helperText"]').eq(1).should('exist').should('contain', 'Нууц үг сэргээх кодоо оруулна уу');
    cy.get('input[name="code"]').type('pinecone10k@gmail.com');
    cy.contains('Нууц үг сэргээх кодоо оруулна уу').should('not.exist');
  });
});
