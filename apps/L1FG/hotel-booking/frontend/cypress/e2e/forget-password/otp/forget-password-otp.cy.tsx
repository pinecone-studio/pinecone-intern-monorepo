describe('Forget Password OTP Page', () => {
  beforeEach(() => {
    cy.visit('/forget-password/otp');
    localStorage.setItem('forgetPasswordEmail', 'test@example.com');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should call handleSubmit and verify OTP', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'ForgetVerifyOTP') {
        req.reply({
          data: {
            forgetVerifyOTP: {
              success: true,
            },
          },
        });
      }
    }).as('forgetVerifyOtp');

    cy.get('[data-cy="Otp-Input-Forget-Password"]').type('1404');

    cy.wait('@forgetVerifyOtp').then((res) => {
      expect(res.response?.body.data.forgetVerifyOTP.success).to.be.equal(true);
    });
  });
});
