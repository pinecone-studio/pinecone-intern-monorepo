describe('Home Page', () => {
  it('shows loading state', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    }).as('gql');
    cy.visit('/');
    cy.contains('Loading...').should('be.visible');
  });

  it('shows error state', () => {
    cy.intercept('POST', '/api/graphql', { statusCode: 500, body: {} });
    cy.visit('/');
    cy.contains('Error loading profiles.').should('be.visible');
  });

  it('shows no more profiles', () => {
    cy.intercept('POST', '/api/graphql', { body: { data: { getusers: [] } } });
    cy.visit('/');
    cy.contains('No more profiles').should('be.visible');
  });

  it('can like and dislike multiple profiles', () => {
    cy.intercept('POST', '/api/graphql', {
      body: {
        data: {
          getusers: [
            { id: '1', name: 'Alice', images: [] },
            { id: '2', name: 'Bob', images: [] },
            { id: '3', name: 'Carol', images: [] }
          ]
        }
      }
    });
    cy.visit('/');

    cy.contains('Alice').should('be.visible');
    cy.get('[data-testid="like"]').first().click();

    cy.contains('Bob').should('be.visible');
    cy.get('[data-testid="dislike"]').first().click();

    cy.contains('Carol').should('be.visible');
    cy.get('[data-testid="like"]').first().click();

    cy.contains('No more profiles').should('be.visible');
  });
}); 