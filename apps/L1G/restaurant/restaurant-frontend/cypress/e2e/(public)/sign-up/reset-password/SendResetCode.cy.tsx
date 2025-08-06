describe('Reset Password Page', () => {
  it(`Should render reset password page`, () => {
    cy.visit('/reset-password');
    cy.get('[data-cy="Send-Reset-Code-Page"]').should('be.visible');
    cy.get('[data-cy="Send-Reset-Code-Page"]').should('have.text', 'Нууц үг сэргээхҮргэлжүүлэх');
  });
  it(`Should show error when user enters not email format`, () => {
    cy.visit('/reset-password');
    cy.get('[data-cy="Email-Input"]').type('asd').should('have.value', 'asd');
    cy.get('[data-cy="Continue-Button"]').click();

    cy.get('[ data-cy="Email-Error-Message"]').should('have.text', 'Имэйл хаяг буруу байна');
  });
  it(`Should show error when user enters nothing in input`, () => {
    cy.visit('/reset-password');
    cy.get('[data-cy="Email-Input"]').type(' ');
    cy.get('[data-cy="Continue-Button"]').click();

    cy.get('[ data-cy="Email-Error-Message"]').should('have.text', 'Имэйл хаяг оруулна уу');
  });
  it(`Should goes to next page when email is valid`, () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'SendResetCode') {
        req.reply({
          data: {
            sendResetCode: {
              email: 't.smunkhbold1@gmail.com',
            },
          },
        });
      }
    }).as('mockSendResetCode');

    cy.visit('/reset-password');
    cy.get('[data-cy="Email-Input"]').type('t.smunkhbold1@gmail.com').should('have.value', 't.smunkhbold1@gmail.com');
    cy.get('[data-cy="Continue-Button"]').click();

    cy.wait('@mockSendResetCode');
    cy.url().should('include', '/reset-password/verify-password');
  });
});
