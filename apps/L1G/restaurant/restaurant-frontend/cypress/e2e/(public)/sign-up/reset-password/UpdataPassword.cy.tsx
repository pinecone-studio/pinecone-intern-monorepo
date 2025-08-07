describe('UpdatePassword', () => {
  it('should render update password page', () => {
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[data-cy="Update-Password-Page"]`).should('be.visible');
  });
  it('should throw error when user enters not 6 digit in password', () => {
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[ data-cy="password-input"]`).type('0').should('have.value', '0');
    cy.get(`[data-cy="Update-Password-Button"]`).click();
    cy.get(`[data-cy="Error-Message-Password"]`).should('have.text', 'Нууц үг 6 оронтой байх ёстой');
  });
  it('should throw error when user enters not 6 digit in confirm password', () => {
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[ data-cy="confirm-password-input"]`).type('0').should('have.value', '0');
    cy.get(`[data-cy="Update-Password-Button"]`).click();
    cy.get(`[data-cy="Error-Message-Confirm"]`).should('have.text', 'Нууц үг 6 оронтой байх ёстой');
  });
  it('should throw error when user enters not match password', () => {
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[ data-cy="confirm-password-input"]`).type('012345').should('have.value', '012345');
    cy.get(`[ data-cy="password-input"]`).type('123456').should('have.value', '123456');
    cy.get(`[data-cy="Update-Password-Button"]`).click();
    cy.get(`[data-cy="Error-Message-Confirm"]`).should('have.text', 'Нууц үг таарахгүй байна');
  });
  it('should navigate to sign in page when successfull', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'ResetPassword') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              resetPassword: {
                success: true,
                message: 'Password reset successfully',
              },
            },
          },
        });
      }
    }).as('mockResetPassword');
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[ data-cy="confirm-password-input"]`).type('012345').should('have.value', '012345');
    cy.get(`[ data-cy="password-input"]`).type('012345').should('have.value', '012345');
    cy.get(`[data-cy="Update-Password-Button"]`).click();
    cy.wait('@mockResetPassword');
    cy.url().should('include', '/sign-in');
  });
  it('should throw a error when request is failed', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'ResetPassword') {
        req.reply({
          statusCode: 500,
          body: {
            data: {
              resetPassword: {
                success: false,
                message: 'Password reset failed',
              },
            },
          },
        });
      }
    }).as('mockResetPassword');
    cy.visit('/reset-password/verify-password/update-password');
    cy.get(`[ data-cy="confirm-password-input"]`).type('012345').should('have.value', '012345');
    cy.get(`[ data-cy="password-input"]`).type('012345').should('have.value', '012345');
    cy.get(`[data-cy="Update-Password-Button"]`).click();
    cy.wait('@mockResetPassword');
    cy.get('[data-cy="Error-Message-Confirm"]').should('have.text', 'Reset password amjiltgui bolloo');
  });
});
