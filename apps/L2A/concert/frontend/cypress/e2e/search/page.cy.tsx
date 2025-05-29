describe('/search page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/graphql').as('gqlSearch');
    cy.visit('/search?name=nomadic');
  });

  it('displays concert results for a real search term', () => {
    cy.wait('@gqlSearch');
    cy.get('[data-testid="concert-card"]').should('exist');
  });

  it('shows "Илэрц олдсонгүй!" when no concerts found', () => {
    cy.visit('/search?name=nomadicasdfasd');

    cy.wait('@gqlSearch');
    cy.contains('Илэрц олдсонгүй!').should('exist');
  });

  it('displays loading state initially', () => {
    cy.visit('/search?name=test');

    cy.contains('Түр хүлээнэ үү').should('exist');
  });

  it('should throw an error', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        errors: [{ message: 'Network error' }],
      },
    }).as('errorSearch');

    cy.visit('/search?name=test');
    cy.wait('@errorSearch');
    cy.contains('Network error').should('exist');
  });

  it('should find result but shouldnt trigger if statement', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: { searchEvents: null },
      },
    }).as('noconcertsSearch');

    cy.visit('/search?name=test');
    cy.wait('@noconcertsSearch');
  });
});
