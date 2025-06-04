describe('Concert Page (real data) E2E', () => {
  const CONCERT_ID = '682c156a1a614ed87f49673b';

  beforeEach(() => {
    cy.visit(`/event/${CONCERT_ID}`);
  });

  it('renders the banner with the correct title', () => {
    cy.get('[data-testid="concert-banner"]').should('be.visible').and('contain', 'NOMADIC LEGEND');
  });

  it('should find no concerts', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: {
          concerts: null,
        },
      },
    }).as('noconcert');
    cy.wait('@noconcert');
    cy.contains('No concert found').should('be.visible');
  });

  it('should throw an error', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        errors: [{ message: 'fail' }],
      },
    }).as('error');
    cy.wait('@error');
    cy.contains('Error').should('be.visible');
  });
});
