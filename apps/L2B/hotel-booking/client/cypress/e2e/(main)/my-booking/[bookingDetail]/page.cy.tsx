describe('Booking Detail Page', () => {
  const mockBookingId = '123';

  beforeEach(() => {
    cy.visit(`/my-booking/${mockBookingId}`);

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              id: mockBookingId,
              guestName: 'John Doe',
              checkInDate: '2025-06-10T14:00:00.000Z',
              checkOutDate: '2025-06-12T11:00:00.000Z',
            },
          },
        });
      }
    }).as('getBooking');

    cy.wait('@getBooking');
  });

  it('should display booking details correctly', () => {
    cy.contains('John Doe').should('not.exist');

    cy.contains('Tuesday, Jun 10').should('be.visible');

    cy.contains('Thursday, Jun 12').should('be.visible');
  });
});
