export const initiateResetPassword = (helperText: string) => {
  cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
  cy.get('[data-cy="Reset-Form1-Button"]').should('be.disabled');
  cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', helperText);
};

export const initiateResetPassword1 = (email: string) => {
  cy.get('input[name="email"]').type(email);
  cy.contains('Имэйл хаяг аа оруулна уу').should('not.exist');
  cy.get('[data-cy="Reset-Form1-Button"]').should('exist').click();
};

export const initiateResetPassword2 = (helperText: string) => {
  cy.get('[data-testid="reset-form2-container"]').should('exist').should('be.visible');
  cy.get('[data-cy="Reset-Form2-Button"]').should('exist').click();
  cy.get('[data-cy="Reset-Form2-Button"]').should('be.disabled');
  cy.get('[data-testid="helperText"]').eq(0).should('exist').should('contain', helperText);
};

export const initiateResetPassword3 = (code: string) => {
  cy.get('input[name="code"]').type(code);
  cy.contains('Нууц үг сэргээх кодоо оруулна уу').should('not.exist');
  cy.get('[data-cy="Reset-Form2-Button"]').should('exist').click();
  cy.get('[data-testid="reset-form3-container"]').should('exist').should('be.visible');
};
