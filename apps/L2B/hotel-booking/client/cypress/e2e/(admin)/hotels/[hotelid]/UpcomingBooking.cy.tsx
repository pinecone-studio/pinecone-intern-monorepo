describe('UpcomingBookings Component', () => {
  const hotelId = `682ac7df47df32a8a9907cb1`;
  const mockBookings = [
    {
      _id: 'booking1234',
      hotelId: { _id: `${hotelId}` },
      roomId: { _id: 'room1', name: 'Deluxe Room' },
      userId: { firstName: 'John' },
      guests: { adults: 2, children: 1 },
      checkInDate: '2025-07-01T00:00:00.000Z',
      checkOutDate: '2025-07-03T00:00:00.000Z',
    },
    {
      _id: 'booking5678',
      hotelId: { _id: `${hotelId}` },
      roomId: { _id: 'room2', name: 'Presidential Suite' },
      userId: { firstName: 'Alice' },
      guests: { adults: 1, children: 0 },
      checkInDate: '2025-07-10T00:00:00.000Z',
      checkOutDate: '2025-07-12T00:00:00.000Z',
    },
    {
      _id: 'booking9999',
      hotelId: { _id: `${hotelId}` },
      roomId: { _id: 'room3', name: 'Single Room' },
      userId: { firstName: 'Bob' },
      guests: { adults: 1, children: 0 },
      checkInDate: '2025-07-05T00:00:00.000Z',
      checkOutDate: '2025-07-06T00:00:00.000Z',
    },
    {
      _id: 'booking0000',
      hotelId: { _id: `${hotelId}` },
      roomId: { _id: 'room4' },
      userId: { firstName: 'Charlie' },
      guests: { adults: 1, children: 1 },
      checkInDate: '2025-07-08T00:00:00.000Z',
      checkOutDate: '2025-07-09T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.reply({
          data: {
            upcomingBookings: mockBookings,
          },
        });
      }
    }).as('getBookings');

    cy.visit(`/hotels/${hotelId}`);
    cy.wait('@getBookings');
  });

  it('should render the component title and table headers', () => {
    cy.contains('h2', 'Upcoming Bookings').should('be.visible');
    cy.contains('th', 'ID').should('be.visible');
    cy.contains('th', 'Guest').should('be.visible');
    cy.contains('th', 'Date').should('be.visible');
    cy.contains('th', 'Rooms').should('be.visible');
  });

  it('should display booking data correctly', () => {
    cy.contains('tr', 'John').within(() => {
      cy.contains('1234').should('exist');
      cy.contains('Deluxe Room').should('exist');
      cy.contains('(2 adults, 1 children)').should('exist');
      cy.contains('7/1/2025 – 7/3/2025(2 nights)').should('exist');
    });

    cy.contains('tr', 'Alice').within(() => {
      cy.contains('5678').should('exist');
      cy.contains('Presidential Suite').should('exist');
      cy.contains('(1 adult, 0 children)').should('exist');
      cy.contains('7/10/2025 – 7/12/2025(2 nights)').should('exist');
    });

    cy.contains('tr', 'Bob').within(() => {
      cy.contains('9999').should('exist');
      cy.contains('Single Room').should('exist');
      cy.contains('(1 adult, 0 children)').should('exist');
      cy.contains('7/5/2025 – 7/6/2025(1 night)').should('exist');
    });

    cy.contains('tr', 'Charlie').within(() => {
      cy.contains('0000').should('exist');
      cy.contains('Unknown Room').should('exist');
    });
  });

  it('should navigate to booking details when a row is clicked', () => {
    cy.contains('tr', 'John').click();
    cy.url().should('include', `/hotels/${hotelId}/room1/booking1234`);

    cy.go('back');
    cy.contains('tr', 'Alice').click();
    cy.url().should('include', `/hotels/${hotelId}/room2/booking5678`);
  });

  it('should display sorting buttons in Date and Rooms columns', () => {
    cy.contains('th', 'Date').find('svg').should('have.length', 2);
    cy.contains('th', 'Rooms').find('svg').should('have.length', 2);
  });

  context('when there are no bookings', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'UpcomingBookings') {
          req.reply({ data: { upcomingBookings: [] } });
        }
      }).as('getEmptyBookings');

      cy.visit(`/hotels/${hotelId}`);
      cy.wait('@getEmptyBookings');
    });

    it('should display "No upcoming bookings" message', () => {
      cy.contains('No upcoming bookings').should('be.visible');
      cy.get('tbody tr').should('have.length', 1);
    });
  });

  it('should handle the case when guest name is missing', () => {
    type Booking = typeof mockBookings[number];
    const bookingsWithMissingName: Booking[] = JSON.parse(JSON.stringify(mockBookings));
    bookingsWithMissingName[0].userId.firstName = undefined as unknown as string;

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpcomingBookings') {
        req.reply({
          data: {
            upcomingBookings: bookingsWithMissingName,
          },
        });
      }
    }).as('getBookingsWithMissingName');

    cy.visit(`/hotels/${hotelId}`);
    cy.wait('@getBookingsWithMissingName');

    cy.contains('Unknown Guest').should('exist');
  });
});
