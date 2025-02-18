import { hasOperationName } from 'cypress/support/app.po';

describe('ticket subscriber', () => {
  it('should ticketsub successfull', () => {
    // eslint-disable-next-line no-secrets/no-secrets
    cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'GetOrderTicketNumber')) {
        req.reply({
          body: {},
        });
      }
    }).as('gqlGetOrderTicketNumber');

    cy.intercept('POST', 'http://localhost:4200/api/graphql', (req) => {
      if (hasOperationName(req, 'GetConcert')) {
        console.log(req.body);
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
                  quantity: 88,
                },
                standingAreaTicket: {
                  price: 60000,
                  quantity: 100,
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
    }).as('gqlGetConcert');

    // cy.wait('gqlGetOrderTicketNumber');

    cy.wait('@gqlGetConcert');

    cy.get('[data-cy="standart-ticket"]').click();

    cy.get('[data-cy="ticket-buy"]').click();

    cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
    cy.get('[data-cy="reservation-phone-input"]').type('98989898');
    cy.get('[data-cy="reservation-email-input"]').should('be.visible');
    cy.get('[data-cy="reservation-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="reservation-button"]').should('not.be.disabled');
    cy.get('[data-cy="reservation-button"]').click();
  });
  // it('create order number', ()=>{
  //   cy.get()
  // })
});
