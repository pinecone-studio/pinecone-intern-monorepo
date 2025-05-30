describe('Booking Page', () => {
  const concertId = '6824b74c8db390ee25b237e9';
  beforeEach(() => {
    cy.visit(`/booking/${concertId}`);
  });

  it('displays loading state initially', () => {
    cy.contains('Түр хүлээнэ үү').should('exist');
  });

  it('loads concert data and allows booking flow', () => {
    cy.get('[data-testid="ticket-list"]', { timeout: 10000 }).should('exist');

    cy.get('[data-testid="plus-button-1"]').click();
    cy.get('[data-testid="plus-button-1"]').click();
    cy.get('[data-testid="minus-button-1"]').click();

    cy.contains('Тасалбар авах').should('not.be.disabled');

    cy.contains('Тасалбар авах').click();
  });

  it('shows error when concert not found', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        errors: [{ message: 'No concert found' }],
      },
    }).as('errorConcert');

    cy.wait('@errorConcert');
    cy.contains('No concert found').should('exist');
  });

  it('should show errror when no concert is found', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: {
        data: {
          concert: null,
        },
      },
    }).as('getConcertsError');
    cy.wait('@getConcertsError');
  });
});
