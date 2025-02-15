describe('Create Account Page', () => {
  beforeEach(() => {
    cy.visit('/create-account');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should render the page correctly', () => {
    cy.get('[data-cy="Create-Account-Page"]').should('be.visible');
  });

  it('should trigger handleSubmit and request OTP', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'RequestOTP') {
        req.reply({
          data: {
            requestOTP: {
              success: true,
              email: 'test@example.com',
            },
          },
        });
      }
    }).as('requestOtp');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains('Continue').click();

    cy.wait('@requestOtp').then(({ response }) => {
      expect(response?.body.data.requestOTP.success).to.be.equal(true);
    });

    cy.window().then((win) => {
      expect(win.localStorage.getItem('email')).to.equal('test@example.com');
    });

    cy.url().should('include', '/create-account/otp');
  });

  it('should show loading component when request is in progress', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'RequestOTP') {
        req.reply((res) => {
          res.send({
            data: {
              requestOTP: {
                success: true,
                email: 'test@example.com',
              },
            },
          });
        });
      }
    }).as('requestOtp');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains('Continue').click();

    cy.get('[data-cy="loading"]').should('be.visible'); // Loading компонент байгаа эсэхийг шалгах
    cy.wait('@requestOtp');
  });

  it('should show loading component when request is in progress', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'RequestOTP') {
        req.reply((res) => {
          res.send({
            data: {
              requestOTP: {
                success: false,
                email: 'test@example.com',
              },
            },
          });
        });
      }
    }).as('requestOtp');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button').contains('Continue').click();

    cy.get('[data-cy="loading"]').should('be.visible');
    cy.wait('@requestOtp');
  });
});
