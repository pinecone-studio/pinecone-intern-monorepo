describe('Verify Reset Code Page', () => {
  it(`should render verify reset code page`, () => {
    cy.visit('/reset-password/verify-password');
    cy.get(`[data-cy="Verify-Reset-Code-Page" ]`).should('be.visible');
  });
  it(`should throw error when user enters not 4 digit`, () => {
    cy.visit('/reset-password/verify-password');
    cy.get(`[ data-cy="opt-input-test"]`).type('0').should('have.value', '0');
    cy.get(`[ data-cy="opt-input-test"]`).type('{enter}');
    cy.get(`[data-cy="Error-Message"]`).should('have.text', 'Код 4 оронтой байх ёстой');
  });
  it(`should throw error when user enters 4 digit but not match`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'VerifyResetCode') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'invalid code' }],
          },
        });
      }
    }).as('mockVerifyResetCode');
    cy.visit('/reset-password/verify-password');
    cy.get(`[ data-cy="opt-input-test"]`).type('0123').should('have.value', '0123');
    cy.get(`[data-cy="Error-Message"]`).should('have.text', 'Код буруу байна');
  });
  it(`should navigate to next step when code is matched`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'VerifyResetCode') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              verifyResetCode: {
                success: true,
                message: 'Code verified successfully',
              },
            },
          },
        });
      }
    }).as('mockVerifyResetCode');
    cy.visit('/reset-password/verify-password');
    cy.get(`[ data-cy="opt-input-test"]`).type('0123');

    cy.wait('@mockVerifyResetCode');
    cy.url({ timeout: 5000 }).should('include', '/reset-password/verify-password/update-password');
  });
  it('should go back when clicked arrowleft button', () => {
    cy.visit('/reset-password/verify-password');
    cy.get(`[data-cy="ArrowLeft-Back"]`).click();
    cy.url().should(`include`, '/reset-password');
  });
  it('should resend 4 digit code to users email', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SendResetCode') {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              verifyResetCode: {
                success: true,
                message: 'Reset code sent successfully',
              },
            },
          },
        });
      }
    }).as('mockVerifyResetCode');

    cy.window().then((win) => {
      win.localStorage.setItem('emailAddress', 'user@example.com');
    });

    cy.visit('/reset-password/verify-password');
    cy.get(`[data-cy="Resend-Button"]`).click();
    cy.get(`[ data-cy="opt-input-test"]`).should('have.value', '');
    cy.wait('@mockVerifyResetCode');
  });

  it(`should throw error when user resent code but failed`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SendResetCode') {
        req.reply({
          statusCode: 500,
          body: {
            errors: [{ message: 'Internal server error' }],
          },
        });
      }
    }).as('mockVerifyResetCode');

    cy.window().then((win) => {
      win.localStorage.setItem('emailAddress', 'user@example.com');
    });

    cy.visit('/reset-password/verify-password');

    cy.get(`[data-cy="Resend-Button"]`).click();

    cy.get(`[ data-cy="opt-input-test"]`).should('have.value', '');

    cy.wait('@mockVerifyResetCode');

    cy.get('[data-cy="Error-Message"]').should('be.visible').and('have.text', 'Хүсэлт явуулахад алдаа гарлаа');
  });
  it(`should throw error when user resent code but email is not found`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SendResetCode') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'User not found' }],
          },
        });
      }
    }).as('mockVerifyResetCode');

    cy.visit('/reset-password/verify-password');

    cy.get(`[data-cy="Resend-Button"]`).click();

    cy.get(`[ data-cy="opt-input-test"]`).should('have.value', '');

    cy.wait('@mockVerifyResetCode');

    cy.get('[data-cy="Error-Message"]').should('be.visible').and('have.text', 'Имэйл хаяг олдсонгүй');
  });

  it(`it should throw error when user enters 4 digit but request is failed`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'VerifyResetCode') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'internal server error' }],
          },
        });
      }
    }).as('mockVerifyResetCode');

    cy.visit('/reset-password/verify-password');

    cy.get(`[ data-cy="opt-input-test"]`).type('0123');
    cy.wait('@mockVerifyResetCode');
    cy.get('[data-cy="Error-Message"]').should('be.visible').and('have.text', 'Хүсэлт явуулахад алдаа гарлаа');
  });
});
