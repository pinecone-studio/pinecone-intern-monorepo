describe('Create Account OTP Page', () => {
  beforeEach(() => {
    cy.visit('/create-account/otp');
    localStorage.setItem('email', 'test@example.com');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should call handleSubmit and verify OTP', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'VerifyOTP') {
        req.reply({
          data: {
            verifyOTP: {
              success: true,
            },
          },
        });
      }
    }).as('verifyOtpRequest');

    cy.get('[data-cy="Otp-Input"]').type('1404');

    cy.wait('@verifyOtpRequest').then((res) => {
      expect(res.response?.body.data.verifyOTP.success).to.be.equal(true);
    });
  });
});
