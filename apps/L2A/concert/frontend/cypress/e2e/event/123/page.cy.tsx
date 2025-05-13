/// <reference types="cypress" />

describe('Concert Page E2E', () => {
  const mockConcertResponse = {
    data: {
      concert: {
        id: '123',
        title: 'Mock Concert',
        artistName: 'Artist A',
        description: 'Test concert description',
        doorOpen: '120',
        musicStart: 3600000,
        endDate: '2025-05-20',
        thumbnailUrl: '/images/mock.jpg',
        primaryPrice: 100,
        specialGuestName: 'Guest B',
        seatData: [{ date: '2025-05-20', seats: { VIP: { availableTickets: 2, price: 150 }, Standard: { availableTickets: 5, price: 75 }, Backseat: { availableTickets: 0, price: 50 } } }],
        venue: { id: '1', name: 'Mock Venue', address: '123 Main St', city: 'Ulaanbaatar', capacity: 5000 },
      },
    },
  };

  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'Concert') {
        req.reply(mockConcertResponse);
      }
    }).as('getConcert');
  });

  it('displays loading state then renders concert details', () => {
    cy.contains('Loading...').should('be.visible');
    cy.wait('@getConcert');
    cy.get('[data-testid="concert-banner"]').should('contain', 'Mock Concert');
    cy.contains('Artist A').should('be.visible');
    cy.contains('2025-05-20').should('be.visible');
    cy.contains('Guest B').should('be.visible');
    cy.contains('Тоглолт үзэх өдрөө сонгоно уу.').should('be.visible');
    cy.contains('VIP тасалбар (2)').should('be.visible');
    cy.contains('Энгийн тасалбар (5)').should('be.visible');
    cy.contains('Арын тасалбар (0)').should('be.visible');
    cy.get('button').contains('Тасалбар захиалах').should('not.be.disabled');
  });

  it('handles error state gracefully', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Internal Server Error' }] },
    }).as('getConcertError');

    cy.visit('/event/456');
    cy.wait('@getConcertError');
    cy.contains('Error:').should('be.visible');
    cy.contains('Internal Server Error').should('be.visible');
  });

  it('handles no concert found state', () => {
    cy.intercept('POST', '/api/graphql', {
      body: { data: { concert: null } },
    }).as('getConcertNull');

    cy.visit('/event/999');
    cy.wait('@getConcertNull');
    cy.contains('No concert found').should('be.visible');
  });
});
