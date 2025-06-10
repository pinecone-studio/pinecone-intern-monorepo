const testUser = {
  email: 'zulgerel06n@gmail.com',
  password: '99260960z',
};

const testBooking = {
  bookingId: '6842eeb3d02f380bc69bb654',
};

describe('Booking Confirmation Page E2E Test', () => {
  beforeEach(() => {
    cy.visit('/signin');
    cy.get('[data-cy="Sign-In-Page"]').should('be.visible');
    cy.get('[data-cy="email-input"]').type(testUser.email);
    cy.get('[data-cy="password-input"]').type(testUser.password);
    cy.get('[data-cy="submit-btn"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('displays booking confirmation and navigates', () => {
    cy.intercept('POST', 'https://hotel-booking-server-peach.vercel.app/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              _id: testBooking.bookingId,
              hotelId: { _id: '682ac7df47df32a8a9907cb1', name: 'Flower Hotel', location: 'Ulaanbaatar', rating: 8.4, amenities: ['pool'] },
              roomId: { _id: '6837cc8c8b71557eb9b072e7', type: 'double' },
              userId: { _id: '68411271ae32ccf4b6b2e760', email: testUser.email },
              checkInDate: '2024-03-15T00:00:00.000Z',
              checkOutDate: '2024-03-20T00:00:00.000Z',
            },
          },
        });
      }
    }).as('getBooking');
    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.get('[data-cy="loading"]').should('not.exist', { timeout: 5000 });
    cy.get('[data-cy="booking-title"]').should('contain', "You're confirmed");
    cy.get('[data-cy="contact-email"]').should('contain', testUser.email);
    cy.get('[data-cy="hotel-name"]').should('contain', 'Flower Hotel');
    cy.get('[data-cy="hotel-rating"]').should('contain', '8.4');
    cy.get('[data-cy="room-type"]').should('contain', 'double');
    cy.get('[data-cy="amenity-pool"]').should('exist');
    cy.get('[data-cy="view-booking-button"]').click();
    cy.url().should('include', '/my-booking');
  });

  it('handles missing email', () => {
    cy.intercept('POST', 'https://hotel-booking-server-peach.vercel.app/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              _id: testBooking.bookingId,
              hotelId: { _id: '682ac7df47df32a8a9907cb1', name: 'Flower Hotel', location: 'Ulaanbaatar', rating: 8.4, amenities: ['pool'] },
              roomId: { _id: '6837cc8c8b71557eb9b072e7', type: 'double' },
              userId: { _id: '68411271ae32ccf4b6b2e760', email: null },
              checkInDate: '2024-03-15T00:00:00.000Z',
              checkOutDate: '2024-03-20T00:00:00.000Z',
            },
          },
        });
      }
    }).as('getBooking');
    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.get('[data-cy="loading"]').should('not.exist', { timeout: 5000 });
    cy.get('[data-cy="contact-email"]').should('contain', 'No email provided');
  });

  it('handles missing optional fields', () => {
    cy.intercept('POST', 'https://hotel-booking-server-peach.vercel.app/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              _id: testBooking.bookingId,
              hotelId: { _id: '682ac7df47df32a8a9907cb1', name: 'Flower Hotel', location: 'Ulaanbaatar', rating: null, amenities: [] },
              roomId: { _id: '6837cc8c8b71557eb9b072e7', type: null },
              userId: { _id: '68411271ae32ccf4b6b2e760', email: testUser.email },
              checkInDate: '2024-03-15T00:00:00.000Z',
              checkOutDate: '2024-03-20T00:00:00.000Z',
            },
          },
        });
      }
    }).as('getBooking');
    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.get('[data-cy="loading"]').should('not.exist', { timeout: 5000 });
    cy.get('[data-cy="hotel-rating"]').should('not.exist');
    cy.get('[data-cy="room-type"]').should('contain', 'Room type not specified');
    cy.get('[data-cy^="amenity-"]').should('not.exist');
  });

  it('handles missing bookingId', () => {
    cy.visit('/booking-confirmation?=bookingId');
    cy.get('[data-cy="loading"]').should('be.visible');
  });

  it('handles GraphQL error', () => {
    cy.intercept('POST', 'https://hotel-booking-server-peach.vercel.app/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Failed to fetch booking' }] } });
      }
    }).as('getBooking');
    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.wait('@getBooking');
    cy.get('[data-cy="loading"]').should('be.visible');
  });
});
