describe('User Booking Page', () => {
  it('1. Should render the Usur Booking Page', () => {
    cy.visit('/booking');
    cy.get('[data-cy=User-Booking-Page]').should('be.visible');
  });
});
