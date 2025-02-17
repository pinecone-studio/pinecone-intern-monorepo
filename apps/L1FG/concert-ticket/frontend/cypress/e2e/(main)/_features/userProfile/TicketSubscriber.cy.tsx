describe('ticket subscriber', () => {
  it('should ticketsub successfull', () => {
    // eslint-disable-next-line no-secrets/no-secrets
    cy.visit(`/ticketReservation/6787a7e26ba06ccedf494956`);
    cy.get('[data-cy="standart-ticket"]').click();
    cy.get('[data-cy="ticket-buy"]').click();
    cy.get('[data-cy="reservation-phone-input"]').should('be.visible');
    cy.get('[data-cy="reservation-phone-input"]').type('98989898');
    cy.get('[data-cy="reservation-email-input"]').should('be.visible');
    cy.get('[data-cy="reservation-email-input"]').type('test@gmail.com');
    cy.get('[data-cy="reservation-button"]').should('not.be.disabled');
    cy.get('[data-cy="reservation-button"]').click();
  });
});
