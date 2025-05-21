describe('Update Password Dialog', () => {
  beforeEach(() => {
    cy.intercept('POST', 'api/graphql', (req) => {
      if (req.body.operationName === 'UpdatePassword') {
        req.reply({
          data: {
            updateContact: {
              success: true,
            },
          },
        });
      }
    });

    cy.visit('/security?userId=123');
  });

  it('1. should open the dialog', () => {
    cy.get('[data-cy="Security-Page"]').should('exist');
    cy.contains('Change password').click();
    cy.contains('Are you sure you want to update your password?').should('be.visible');
  });

  it('2. should validate password fields', () => {
    cy.contains('Change password').click();

    cy.get('[data-cy="Security-Update-Button"]').click();

    cy.get('[data-cy="Security-Password-Input-Error-Message"]').should('contain', 'Password must be at least 8 characters long.');
    cy.get('[data-cy="Security-Confirm-Input-Error-Message"]').should('contain', 'Password must be at least 8 characters long.');

    cy.get('[data-cy="Security-Password-Input"]').type('12345678');
    cy.get('[data-cy="Security-Confirm-Input"]').type('87654321');

    cy.get('[data-cy="Security-Update-Button"]').click();
    cy.get('[data-cy="Security-Confirm-Input-Error-Message"]').should('contain', "Passwords don't match");
  });

  it('3. should submit the form with valid passwords', () => {
    cy.contains('Change password').click();
    cy.get('[data-cy="Security-Password-Input"]').type('12345678');
    cy.get('[data-cy="Security-Confirm-Input"]').type('12345678');

    cy.get('[data-cy="Security-Update-Button"]').click();

    cy.get('[data-cy="Password-Dialog"]').should('not.exist');

    cy.contains('Successfully updated!').should('be.visible');
  });
});
