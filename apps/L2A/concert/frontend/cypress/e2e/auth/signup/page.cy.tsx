describe('Signup Page', () => {
  const email = `cypressTest${Math.round(Math.random() * 3000)}@gmail.com`;

  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  it('should sign up successfully', () => {
    const password = 'test1234567890';
    cy.clock();
    cy.intercept('POST', '**/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });

  it("should sign up successfully but shouldn't trigger if statement", () => {
    const password = 'test1234567890';

    cy.intercept('POST', '**/api/graphql', {
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

    cy.intercept('POST', '**/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });
});
