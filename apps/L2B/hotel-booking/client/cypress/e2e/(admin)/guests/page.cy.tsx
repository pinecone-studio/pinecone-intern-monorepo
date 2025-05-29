describe('Guests Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Bookings') {
        req.alias = 'getBookings';
      }
    }).as('getBookings');

    cy.visit('/guests');
    cy.wait('@getBookings');
  });

  it('should load the Guests page with data', () => {
    cy.get('[data-testid="page-title"]').should('contain.text', 'Guests');
    cy.get('[data-cy="Guests-Page"]').should('exist');
    cy.get('table').should('exist');
  });

  it('should filter guests by search input', () => {
    cy.get('[data-testid="search-input"]').type('hotel');
    cy.get('table').should('contain.text', 'IDNameHotelRoomsGuestsDateStatus');
  });

  it('should filter guests by status', () => {
    // Open the status dropdown and select "Booked"
    cy.get('[data-testid="status-filter"]').click();
    cy.contains('Booked').click();

    // Assert filtered results
    cy.get('table').should('contain.text', 'IDNameHotelRoomsGuestsDateStatus0001 dulguun zorigtzul hotelrooms1 AdultsJul 8 - Jul 10booked0002 dulguun zorigtzul hotelrooms1 AdultsAug 8 - Aug 9booked');
  });
});
