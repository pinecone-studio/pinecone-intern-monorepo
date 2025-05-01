describe('Sign In Page', () => {
  const email = `cypressTest${Math.round(Math.random() * 3000)}@gmail.com`;

  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  it('should sign up successfully and clears the success message after 5s', () => {
    const password = 'test1234567890';
    cy.clock();
    cy.intercept('POST', process.env.BACKEND_URI ?? 'http://localhost:4200/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@gql').its('response.statusCode').should('eq', 200);
    cy.contains('Бүртгэл амжилттай!').should('be.visible');
    cy.tick(5000);
    cy.contains('Бүртгэл амжилттай!').should('not.exist');
  });

  it("should sign up successfully but shouldn't trigger if statement", () => {
    const password = 'test1234567890';

    cy.intercept('POST', process.env.BACKEND_URI ?? 'http://localhost:4200/api/graphql', {
      body: {
        data: {
          addUser: null,
        },
      },
    }).as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });

  it('should throw an error', () => {
    const password = 'test1234567890';

    cy.intercept('POST', process.env.BACKEND_URI ?? 'http://localhost:4200/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });
});
