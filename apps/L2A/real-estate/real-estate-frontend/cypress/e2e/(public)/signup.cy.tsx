describe('SignUp Page Flow with Mocked OTP', () => {
  it('should complete signup using mocked OTP', () => {
    const generatedMails = `_user${Date.now()}@example.com`;
    cy.intercept('POST', '/api/graphql', (req) => {
      const body = req.body;
      if (body.query.includes('verifyOTP')) {
        req.reply({
          data: {
            verifyOTP: true,
          },
        });
        return;
      }

      if (body.query.includes('completeSignup')) {
        req.reply({
          data: {
            completeSignup: {
              user: {
                id: 'mock-user-id',
                email: 'user@example.com',
              },
              token: 'mock-jwt-token',
            },
          },
        });
        return;
      }
    }).as('graphql');
    cy.visit('/signup');
    cy.get('[data-cy=email-input]').type(generatedMails);
    cy.get('form').submit();
    cy.get('[data-cy=otp-input]').type('123456'); 
    cy.wait('@graphql'); 
    cy.get('[data-cy=password-input]').type('mockpassword123');
    cy.get('[data-cy=confirm-password-input]').type('mockpassword123');
    cy.get('form').submit();

  });
});
