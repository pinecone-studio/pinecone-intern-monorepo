describe('Cancel Booking Page', () => {
  const bookingId = 'test-booking-id';

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateBookingStatus') {
        req.reply({
          data: {
            updateBookingStatus: {
              id: bookingId,
              status: req.body.variables.status,
              __typename: 'Booking',
            },
          },
        });
      }
    }).as('updateBookingStatus');

    cy.visit(`/my-booking/${bookingId}/${bookingId}`);
  });

  it('should display cancellation rules and booking information', () => {
    cy.contains('Cancellation rules').should('be.visible');
    cy.contains('Free cancellation until Jun 30').should('be.visible');
    cy.contains('Standard Single Room, 1 King Bed').should('be.visible');
    cy.contains('Property Support').should('be.visible');
    cy.contains('72055771948934').should('be.visible');
  });

  it('should cancel booking successfully', () => {
    cy.contains('Cancel Booking').click();

    cy.contains('Cancel booking?').should('be.visible');
    cy.contains("The property won't charge you.").should('be.visible');

    cy.contains('Confirm cancellation').click();

    cy.wait('@updateBookingStatus').then((interception) => {
      expect(interception.request.body.variables).to.deep.include({
        updateBookingStatusId: bookingId,
        status: 'cancelled',
      });
    });

    cy.contains('Booking cancelled successfully').should('be.visible');

    cy.contains('Cancel booking?').should('not.exist');
  });

  it('should close dialog when clicking Close button', () => {
    cy.contains('Cancel Booking').click();
    cy.contains('Cancel booking?').should('be.visible');

    cy.contains('Close').click();

    cy.contains('Cancel booking?').should('not.exist');
  });

  it('should navigate back when clicking back button', () => {
    cy.get('button').contains('svg').should('not.exist');

    cy.get('a[href*="/my-booking/"]').should('exist');
  });

  it('should display contact information', () => {
    cy.contains('Chingis Khan Hotel').should('be.visible');
    cy.contains('Call +976 7270 0800').should('be.visible');
  });
});
