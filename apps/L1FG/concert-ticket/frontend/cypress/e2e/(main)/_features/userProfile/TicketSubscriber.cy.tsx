// eslint-disable-next-line no-secrets/no-secrets
describe('ticket subscriber', () => {
  const mockValue = {
    phoneNumber: '98778877',
    email: 'test@gmail.com',
  };
  it('should ticketsub successfull', () => {
    cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
    cy.get('[data-cy="standart-ticket"]').click();
    cy.get('[data-cy="ticket-buy"]').click();
    cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
    cy.get('[data-cy="reservation-phone-input"]').type('98989898');
    cy.get('[data-cy="reservation-email-input"]').should('be.visible');
    cy.get('[data-cy="reservation-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="reservation-button"]').click();
  });
  // it('email and phoneNumber value', () => {
  //   cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
  //   cy.get('[data-cy="standart-ticket"]').click();
  //   cy.get('[data-cy="ticket-buy"]').click();
  //   cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
  //   cy.get('[data-cy="reservation-phone-input"]').type('98989898');
  //   cy.get('[data-cy="reservation-email-input"]').should('be.visible');

  //   cy.get('[data-cy="reservation-email-input"]').type('test@gmail.com');
  //   cy.get('[data-cy="reservation-button"]').click();
  //   // cy.get('[data-cy="payment-qpay"]').click();
  //   // cy.get('[data-cy="payment-handle-back"]').click();
  //   cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
  //   cy.get('[data-cy="reservation-email-input"]').should('be.visible');
  //   cy.get('[data-cy="reservation-phone-input"]').and('have.attr', 'placeholder', mockValue.phoneNumber);
  //   cy.get('[data-cy="reservation-email-input"]').and('have.attr', 'placeholder', mockValue.email);
  // });
});
