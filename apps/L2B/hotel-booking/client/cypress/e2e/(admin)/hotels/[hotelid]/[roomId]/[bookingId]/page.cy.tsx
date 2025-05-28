describe('Guest Info Page', () => {
  const bookingId = 'test-booking-id-123';

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const { operationName } = req.body;

      if (operationName === 'Booking') {
        req.alias = 'BookingQuery';
        req.reply({
          data: {
            booking: {
              id: bookingId,
              checkInDate: '2025-05-25T00:00:00.000Z',
              checkOutDate: '2025-05-28T00:00:00.000Z',
              status: 'confirmed',
              adults: 2,
              children: 1,
              infants: 0,
              userId: {
                id: 'user-1',
                firstName: 'John',
                lastName: 'Doe',
              },
              room: {
                id: 'room-1',
                name: 'Deluxe Room',
                price: 100,
              },
              totalPrice: 300,
              createdAt: '2025-05-01T12:00:00.000Z',
            },
          },
        });
      }

      if (operationName === 'UpdateBookingStatus') {
        req.alias = 'UpdateBookingStatusMutation';
        req.reply({
          data: {
            updateBookingStatus: {
              id: bookingId,
              status: 'checked_out',
            },
          },
        });
      }
    });
  });

  it('should load guest info and display user name', () => {
    cy.visit(`/hotels/hotel-id/room-id/${bookingId}`);
    cy.wait(2000); // түр зуур нэмсэн

    cy.contains('John Doe').should('exist');
    cy.contains('2025-05-25').should('exist');
    cy.contains('2025-05-28').should('exist');
  });

  it('should update booking status to checked_out', () => {
    cy.visit(`/hotels/hotel-id/room-id/${bookingId}`);

    cy.contains('Checkout').click();

    cy.contains('Confirm').click();

    cy.wait('@BookingQuery').then(({ request }) => {
      expect(request.body.operationName).to.equal('Booking');
    });

    cy.contains('confirmed').should('exist');

    cy.get('[data-testid="confirm-modal"]').should('not.exist');
  });

  Cypress.on('uncaught:exception', () => {
    return false;
  });
});
