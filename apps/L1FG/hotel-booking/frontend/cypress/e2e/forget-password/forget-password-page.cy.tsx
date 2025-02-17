describe('Forget Password Page ', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('shuold render the page correctly', () => {
    cy.get('[data-cy="Forget-Password-Email-Page"]').should('be.visible');
  });

  it('should trigger handleForgetButtonClick and request OTP', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'ForgetRequestOTP') {
        req.reply({
          data: {
            forgetRequestOTP: {
              success: true,
              email: 'test@example.com',
            },
          },
        });
      }
    }).as('forgetRequestOtp');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains('Continue').click();

    cy.wait('@forgetRequestOtp').then(({ response }) => {
      expect(response?.body.data.forgetRequestOTP.success).to.be.equal(true);
    });

    cy.window().then((win) => {
      expect(win.localStorage.getItem('forgetPasswordEmail')).to.equal('test@example.com');
    });

    cy.url().should('include', '/forget-password/otp');
  });

  it('should show loading component when request is in progress', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'ForgetRequestOTP') {
        req.reply({
          data: {
            forgetRequestOTP: {
              success: false,
              email: 'test@example.com',
            },
          },
        });
      }
    }).as('forgetRequestOtp');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains('Continue').click();

    cy.wait('@forgetRequestOtp');
  });
});
