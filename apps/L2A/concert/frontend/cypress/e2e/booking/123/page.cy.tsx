describe('Booking Page', () => {
  const concertId = '6825f68c2960da88d5aa7a6a';
  beforeEach(() => {
    cy.visit(`/booking/${concertId}`);
  });

  it('displays loading state initially', () => {
    cy.contains('Түр хүлээнэ үү').should('exist');
  });

  it('loads concert data and allows booking flow', () => {
    cy.get('[data-testid="ticket-list"]', { timeout: 10000 }).should('exist');

    cy.get('[data-testid="ticket-list"] button').contains('+').first().click();

    cy.contains('Тасалбар авах').should('not.be.disabled');

    cy.contains('Тасалбар авах').click();

    cy.window().then((win) => {
      const booking = JSON.parse(win.localStorage.getItem('booking') || '{}');
      expect(booking).to.have.property('tickets');
      expect(booking.tickets.length).to.be.greaterThan(0);
      expect(booking).to.have.property('totalPrice');
    });
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
