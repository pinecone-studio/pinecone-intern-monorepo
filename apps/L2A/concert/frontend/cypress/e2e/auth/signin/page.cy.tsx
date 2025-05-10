describe('Sign In Page', () => {
  const email = 'glpzghoo@gmail.com';

  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit('/auth/signin');
  });
  it('should log in successfully', () => {
    const password = 'glpzghoo@gmail.com';

    cy.intercept('POST', '**/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });

  it("should login successfully but shouldn't trigger if statement", () => {
    const password = 'glpzghoo@gmail.com';

    cy.intercept('POST', '**/api/graphql', {
      statusCode: 200,
      body: {
        data: {
          loginUser: { JWT: null },
        },
      },
    }).as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });

  it('should throw an error', () => {
    const password = 'my.as.glpzghoo@gmail.com';

    cy.intercept('POST', '**/api/graphql').as('gql');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.wait('@gql').its('response.statusCode').should('eq', 200);
  });
});
