const user = {
  email: 'zulgerel06n@gmail.com',
  password: '99260960z',
  firstName: 'zulgerel',
  lastName: 'zulgerel',
  phone: '99260960',
};
const booking = {
  hotelId: '682ac7df47df32a8a9907cb1',
  roomId: '6837cc8c8b71557eb9b072e7',
  checkIn: '2024-03-15',
  checkOut: '2024-03-20',
  adults: 2,
  children: 0,
  pricePerNight: 12345,
  totalPrice: 61725,
};
const bookingId = '6842eeb3d02f380bc69bb654';
const bookingUrl = `/check-out/${booking.roomId}?from=${booking.checkIn}&to=${booking.checkOut}&adults=${booking.adults}&children=${booking.children}`;
const setupIntercepts = () => {
  const handlers = {
    GetUser: () => ({
      data: {
        getUser: {
          _id: '68411271ae32ccf4b6b2e760',
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    }),
    Room: () => ({
      data: {
        room: {
          _id: booking.roomId,
          name: 'rooms',
          type: 'double',
          pricePerNight: booking.pricePerNight,
          hotelId: {
            _id: booking.hotelId,
            name: 'Flower Hotel',
            location: 'Located 1 mi from Sukhbaatar Square in Ulaanbaatar',
            rating: 8.4,
          },
          images: ['/room-image.jpg'],
          services: {
            bedroom: ['King Bed'],
            bathroom: ['Shower'],
            foodAndDrink: ['Minibar'],
            internet: ['Free WiFi'],
          },
        },
      },
    }),
    UpdatePersonalInformation: () => ({ data: { updatePersonalInformation: true } }),
    UpdateContact: () => ({ data: { updateContact: true } }),
    CreateBooking: () => ({
      data: {
        createBooking: {
          _id: bookingId,
        },
      },
    }),
  };

  cy.intercept('POST', '**/api/graphql', (req) => {
    const handler = handlers[req.body.operationName as keyof typeof handlers];
    if (handler) {
      req.reply(handler());
    }
  }).as('graphql');
};
const loginAndNavigate = () => {
  cy.visit('/signin');
  cy.get('[data-cy="Sign-In-Page"]').should('be.visible');
  cy.get('[data-cy="email-input"]').type(user.email);
  cy.get('[data-cy="password-input"]').type(user.password);
  cy.get('[data-cy="submit-btn"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
  cy.visit(bookingUrl);
};
const verifyFormFields = () => {
  cy.get('[data-cy="first-name"]').should('have.value', user.firstName);
  cy.get('[data-cy="last-name"]').should('have.value', user.lastName);
  cy.get('[data-cy="email"]').should('have.value', user.email);
  cy.get('[data-cy="phone"]').should('have.value', user.phone);
};
const verifyBookingSummary = () => {
  cy.get('[data-cy="hotel-name"]').should('contain', 'Flower Hotel');
  cy.get('[data-cy="hotel-location"]').should('contain', 'Located 1 mi from Sukhbaatar Square in Ulaanbaatar');
  cy.get('[data-cy="hotel-rating"]').should('contain', '8.4');
  cy.get('[data-cy="hotel-rating-text"]').should('contain', 'Excellent');
  cy.get('[data-cy="room-image"]').should('be.visible');
  cy.get('[data-cy="total-price"]').should('contain', booking.totalPrice.toFixed(2));
};
const testFormValidation = () => {
  cy.get('[data-cy="first-name"]').clear().type('John');
  cy.get('[data-cy="last-name"]').clear();
  cy.get('[data-cy="email"]').clear();
  cy.get('[data-cy="phone"]').clear();
  cy.get('[data-cy="booking-submit"]').should('contain', 'Proceed to Payment').click();
  cy.wait(1000);
  cy.get('[data-cy="payment-qr-modal"]').should('not.exist');
};
const testPaymentFlow = () => {
  cy.get('[data-cy="first-name"]').clear().type('John');
  cy.get('[data-cy="last-name"]').clear().type('Doe');
  cy.get('[data-cy="email"]').clear().type('john.doe@example.com');
  cy.get('[data-cy="phone"]').clear().type('1234567890');
  cy.get('[data-cy="booking-submit"]').should('contain', 'Proceed to Payment').click();
  cy.get('[data-cy="payment-qr-modal"]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-cy="payment-qr-image"]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-cy="payment-qr-title"]').should('contain', 'Complete Payment');
  cy.get('[data-cy="payment-qr-description"]').should('be.visible');
  cy.get('[data-cy="cancel-payment-button"]').click({ force: true });
  cy.wait(1000);
  cy.get('[data-cy="payment-qr-modal"]').should('not.exist', { timeout: 5000 });
  cy.contains('Payment not completed').should('be.visible');
  cy.get('[data-cy="booking-submit"]').should('contain', 'Proceed to Payment');
  cy.get('[data-cy="booking-submit"]').click();
  cy.get('[data-cy="payment-qr-modal"]', { timeout: 10000 }).should('be.visible');
  cy.get('[data-cy="payment-completed-button"]').click({ force: true });
  cy.wait(1000);
  cy.get('[data-cy="payment-qr-modal"]').should('not.exist', { timeout: 5000 });
  cy.contains('Payment verified successfully').should('be.visible');
  cy.get('[data-cy="booking-submit"]').should('contain', 'Confirm Booking');
};
const testBookingSubmission = () => {
  cy.intercept('POST', '**/api/graphql', (req) => {
    if (req.body.operationName === 'CreateBooking') {
      req.reply({
        data: {
          createBooking: {
            _id: bookingId,
          },
        },
      });
    }
  }).as('graphqlSuccess');
  cy.get('[data-cy="first-name"]').clear().type('John');
  cy.get('[data-cy="last-name"]').clear().type('Doe');
  cy.get('[data-cy="phone"]').clear().type('1234567890');
  cy.get('[data-cy="booking-submit"]').click();
  cy.url().should('include', `/booking-confirmation?bookingId=${bookingId}`);
};
describe('Checkout Page Main Flow', () => {
  beforeEach(() => {
    setupIntercepts();
  });
  it('should handle checkout flow including form validation, user updates, payment cancellation, and completion', () => {
    loginAndNavigate();
    verifyFormFields();
    verifyBookingSummary();
    testFormValidation();
    testPaymentFlow();
    testBookingSubmission();
  });
});
