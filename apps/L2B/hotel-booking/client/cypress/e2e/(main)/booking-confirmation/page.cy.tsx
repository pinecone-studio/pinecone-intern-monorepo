const testUser = {
  email: 'zulgerel06n@gmail.com',
  password: '99260960z',
  firstName: 'zulgerel',
  lastName: 'zulgerel',
  phone: '99260960',
};

const testBooking = {
  bookingId: '6842eeb3d02f380bc69bb654',
  hotelId: '682ac7df47df32a8a9907cb1',
  roomId: '6837cc8c8b71557eb9b072e7',
  checkIn: '2024-03-15T00:00:00.000Z',
  checkOut: '2024-03-20T00:00:00.000Z',
  adults: 2,
  children: 0,
  pricePerNight: 12345,
  totalPrice: 61725,
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

  it('should display booking confirmation details and allow navigation', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              _id: testBooking.bookingId,
              hotelId: {
                _id: testBooking.hotelId,
                name: 'Flower Hotel',
                location: 'Located 1 mi from Sukhbaatar Square in Ulaanbaatar',
                rating: 8.4,
                amenities: ['pool', 'free wifi', 'free parking', 'spa', 'bar', 'restaurants', 'room service'],
              },
              roomId: {
                _id: testBooking.roomId,
                type: 'double',
              },
              userId: {
                _id: '68411271ae32ccf4b6b2e760',
                email: testUser.email,
              },
              checkInDate: testBooking.checkIn,
              checkOutDate: testBooking.checkOut,
            },
          },
        });
      }
    }).as('getBooking');

    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.get('[data-cy="loading"]').should('be.visible');
    cy.get('[data-cy="loading"]').should('not.exist', { timeout: 5000 });
    cy.get('[data-cy="booking-header"]').should('be.visible');
    cy.get('[data-cy="booking-title"]').should('contain', "You're confirmed");
    cy.get('[data-cy="contact-email"]').should('contain', testUser.email);

    cy.get('[data-cy="hotel-name"]').should('contain', 'Flower Hotel');
    cy.get('[data-cy="hotel-location"]').should('contain', 'Located 1 mi from Sukhbaatar Square in Ulaanbaatar');
    cy.get('[data-cy="hotel-rating"]').should('contain', '8.4');
    cy.get('[data-cy="hotel-rating-text"]').should('contain', 'Excellent');

    cy.get('[data-cy="check-in"]').should('contain', 'Friday, Mar 15, 8:00 AM');
    cy.get('[data-cy="check-out"]').should('contain', 'Wednesday, Mar 20, 8:00 AM');

    cy.get('[data-cy="room-type"]').should('contain', 'double');

    ['pool', 'free wifi', 'free parking', 'spa', 'bar', 'restaurants', 'room service'].forEach((amenity) => {
      cy.get(`[data-cy="amenity-${amenity}"]`).should('contain', amenity);
    });

    cy.get('[data-cy="view-booking-button"]').click();
    cy.url().should('include', '/my-booking');
  });

  it('should handle missing email', () => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'Booking') {
        req.reply({
          data: {
            booking: {
              _id: testBooking.bookingId,
              hotelId: {
                _id: testBooking.hotelId,
                name: 'Flower Hotel',
                location: 'Located 1 mi from Sukhbaatar Square in Ulaanbaatar',
                rating: 8.4,
                amenities: ['pool'],
              },
              roomId: {
                _id: testBooking.roomId,
                type: 'double',
              },
              userId: {
                _id: '68411271ae32ccf4b6b2e760',
                email: null,
              },
              checkInDate: testBooking.checkIn,
              checkOutDate: testBooking.checkOut,
            },
          },
        });
      }
    }).as('getBooking');

    cy.visit(`/booking-confirmation?bookingId=${testBooking.bookingId}`);
    cy.get('[data-cy="loading"]').should('not.exist', { timeout: 5000 });
    cy.get('[data-cy="contact-email"]').should('contain', 'No email provided');
  });
});
