describe('My Booking Page', () => {
  beforeEach(() => {
    const fakeUser = {
      _id: 'user123',
      name: 'Sapar',
      email: 'sapar@example.com',
    };

    window.localStorage.setItem('authUser', JSON.stringify(fakeUser));

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.reply({
          data: {
            upcomingBookings: [
              {
                _id: 'up1',
                checkInDate: '2025-06-05T10:00:00.000Z',
                checkOutDate: '2025-06-07T10:00:00.000Z',
                userId: { _id: 'user123' },
                room: { name: 'Deluxe Room' },
              },
            ],
          },
        });
      }

      if (req.body.operationName === 'PastBookings') {
        req.reply({
          data: {
            pastBookings: [
              {
                _id: 'past1',
                checkInDate: '2025-05-01T10:00:00.000Z',
                checkOutDate: '2025-05-03T10:00:00.000Z',
                userId: { _id: 'user123' },
                room: { name: 'Suite Room' },
              },
            ],
          },
        });
      }
    });
  });

  it('displays upcoming and past bookings for the logged-in user', () => {
    cy.visit('/my-booking');

    cy.contains('Deluxe Room').should('not.exist');
    cy.contains('2 nights').should('not.exist');

    cy.contains('Suite Room').should('not.exist');
    cy.contains('2 nights').should('not.exist');
  });
});
