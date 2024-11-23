describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should load the login page', () => {
    cy.get('[data-cy="Login-Page"]').should('exist');
    cy.get('[data-cy="Login-usernameOrEmail-Input"]').should('be.visible');
    cy.get('[data-cy="Login-Password-Input"]').should('be.visible');
    cy.get('[data-cy="Login-Submit-Button"]').should('be.visible');
    cy.get('[data-cy="forgot-password-button"]').should('exist');
    cy.get('[data-cy="sign-up-button"]').should('exist');
  });

  it('should navigate to forgot password page', () => {
    cy.get('[data-cy="forgot-password-button"]').click();
    cy.url().should('include', '/forgotpassword');
  });

  it('should navigate to sign-up page', () => {
    cy.get('[data-cy="sign-up-button"]').click();
    cy.url().should('include', '/signup');
  });
  it('login hiiged password taarad shiljih', () => {
    cy.intercept('POST', 'https://instagram-backend-testing.vercel.app/api/graphql', {
      statusCode: 200,
      body: {
        data: {
          login: {
            token: 'mocked-token',
            user: {
              _id: 'mocked-user-id',
            },
          },
        },
      },
    }).as('loginRequest');
    cy.get('[data-cy="Login-usernameOrEmail-Input"]').type('bat');
    cy.get('[data-cy="Login-Password-Input"]').type('password');
    cy.get('[data-cy="Login-Submit-Button"]').click();
    cy.request({
      method: 'POST',
      url: 'https://instagram-backend-testing.vercel.app/api/graphql',
      body: {
        query: `
      mutation Login($username: String!, $email: String!, $password: String!) {
        login(username: $username, email: $email, password: $password) {
          token
          user {
            _id
          }
        }
      }
    `,
        variables: {
          username: 'mock-user',
          email: 'mock-user',
          password: 'password',
        },
      },
      failOnStatusCode: false,
    }).then((response) => {
      if (response.body?.data) {
        window.localStorage.setItem('userToken', response.body.data.login.token);
      }
    });
    cy.wait('@loginRequest');

    cy.url().should('include', '/home');
    cy.window().then((win) => {
      expect(win.localStorage.getItem('userToken')).to.eq('mocked-token');
    });
  });
  it('login hiiged buruu shiljihgui', () => {
    cy.intercept('POST', 'https://instagram-backend-testing.vercel.app/api/graphql', {
      statusCode: 200,
      body: {
        data: {},
      },
    }).as('loginRequest');
    cy.get('[data-cy="Login-usernameOrEmail-Input"]').type('bat');
    cy.get('[data-cy="Login-Password-Input"]').type('password');
    cy.get('[data-cy="Login-Submit-Button"]').click();
    cy.request({
      method: 'POST',
      url: 'https://instagram-backend-testing.vercel.app/api/graphql',
      body: {
        query: `
      mutation Login($username: String!, $email: String!, $password: String!) {
        login(username: $username, email: $email, password: $password) {
          token
          user {
            _id
          }
        }
      }
    `,
        variables: {
          username: 'mock-user',
          email: 'mock-user',
          password: 'password',
        },
      },
      failOnStatusCode: false,
    });
    cy.wait('@loginRequest');
    cy.url().should('include', '/login');
  });
});
