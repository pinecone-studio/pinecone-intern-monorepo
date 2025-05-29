describe('UpcomingBookings Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.alias = 'UpcomingBookingsQuery';
        req.reply({
          data: {
            upcomingBookings: [
              {
                _id: 'booking1234',
                userId: { firstName: 'Alice' },
                guests: { adults: 2, children: 1 },
                checkInDate: '2025-06-10T00:00:00.000Z',
                checkOutDate: '2025-06-12T00:00:00.000Z',
                roomId: { name: 'Premium Suite' },
              },
            ],
          },
        });
      }
    });

    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/bookings?hotelid=${hotelId}`);
  });

  it('displays the table headers correctly', () => {
    cy.wait('@UpcomingBookingsQuery');
    cy.contains('Upcoming Bookings').should('exist');
    cy.contains('ID').should('exist');
    cy.contains('Guest').should('exist');
    cy.contains('Date').should('exist');
    cy.contains('Rooms').should('exist');
  });

  it('renders booking data in the table', () => {
    cy.wait('@UpcomingBookingsQuery');
    cy.contains('1234').should('exist');
    cy.contains('Alice').should('exist');
    cy.contains('(2 adults, 1 children)').should('exist');
    cy.contains('6/10/2025 – 6/12/2025').should('exist');
    cy.contains('(2 nights)').should('exist');
    cy.contains('Premium Suite').should('exist');
  });

  it('does not break if hotelId is missing', () => {
    cy.visit('/hotels/bookings');
    cy.contains('Upcoming Bookings').should('exist');
    // Still shows the component or fallback gracefully
  });

  it('shows placeholder or fallback for unknown guest or room', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.alias = 'UpcomingBookingsQuery';
        req.reply({
          data: {
            upcomingBookings: [
              {
                _id: 'booking9999',
                userId: null,
                guests: { adults: 1, children: 0 },
                checkInDate: '2025-07-01T00:00:00.000Z',
                checkOutDate: '2025-07-02T00:00:00.000Z',
                roomId: null,
              },
            ],
          },
        });
      }
    });

    cy.visit('/hotels/bookings?hotelid=123');
    cy.wait('@UpcomingBookingsQuery');
    cy.contains('9999').should('exist');
    cy.contains('Unknown Guest').should('exist');
    cy.contains('Unknown Room').should('exist');
  });

  it('renders nothing if there are no bookings', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.alias = 'UpcomingBookingsQuery';
        req.reply({
          data: {
            upcomingBookings: [],
          },
        });
      }
    });

    cy.visit('/hotels/bookings?hotelid=123');
    cy.wait('@UpcomingBookingsQuery');
    cy.get('tbody tr').should('have.length', 0);
  });
});
