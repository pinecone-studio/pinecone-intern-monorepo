import { hasOperationName } from 'cypress/support/app.po';

describe('ticket subscriber', () => {
  it('should ticketsub successfull', () => {
    cy.intercept('POST', 'http://localhost:4100/api/graphql', (req) => {
      if (hasOperationName(req, 'GetConcert')) {
        req.reply({
          body: {
            data: {
              getConcert: {
                _id: '6787a7e26ba06ccedf494956',
                concertName: 'The Dark Side of the Moon',
                concertPlan: 'VIP',
                artistName: ['Pink Floyd'],
                concertDay: '2025-02-15T00:00:00.000Z',
                concertTime: '19:30',
                concertPhoto: '/images/pinkfloyd.png',
                regularTicket: {
                  price: 120000,
                  quantity: 216,
                },
                standingAreaTicket: {
                  price: 60000,
                  quantity: 0,
                },
                vipTicket: {
                  price: 250000,
                  quantity: 14,
                },
              },
            },
          },
        });
      }
    });
    // eslint-disable-next-line no-secrets/no-secrets
    cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
    cy.get('[data-cy="standart-ticket"]').click();
    cy.get('[data-cy="ticket-buy"]').click();
    cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
    cy.get('[data-cy="reservation-phone-input"]').type('98989898');
    cy.get('[data-cy="reservation-email-input"]').should('be.visible');
    cy.get('[data-cy="reservation-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="reservation-button"]').click();
  });
  it('email and phoneNumber value', () => {
    // eslint-disable-next-line no-secrets/no-secrets
    cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
    cy.get('[data-cy="standart-ticket"]').click();
    cy.get('[data-cy="ticket-buy"]').click();
    cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
    cy.get('[data-cy="reservation-phone-input"]').should('have.value', '98778877');
    cy.get('[data-cy="reservation-email-input"]').should('be.visible');
    cy.get('[data-cy="reservation-email-input"]').should('have.value', 'test@gmail.com');
    cy.get('[data-cy="reservation-button"]').click();
  });
});
