describe('HotelAmenities Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.alias = 'HotelQuery';
        req.reply({
          data: {
            hotel: {
              id: 'hotel123',
              amenities: ['WiFi', 'Pool'],
            },
          },
        });
      }
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateHotel') {
        req.alias = 'UpdateHotelMutation';
        req.reply({
          data: {
            updateHotel: {
              id: 'hotel123',
              amenities: req.body.variables.input.amenities,
            },
          },
        });
      }
    });

    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('displays initial amenities correctly', () => {
    cy.wait('@HotelQuery');
    cy.contains('WiFi').should('exist');
    cy.contains('Pool').should('exist');
  });

  it('adds an amenity with enter key', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Gym{enter}');
    cy.contains('Gym').should('exist');
  });

  it('removes an amenity with backspace', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('{backspace}');
    cy.contains('Pool').should('exist');
  });

  it('does not add duplicate amenities', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Pool{enter}');
    cy.get('[data-testid="amenities-input"]').type('Pool{enter}');
    cy.get('div').contains('Pool').should('have.length', 1);
  });

  it('closes dialog and resets changes correctly', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Yoga{enter}');
    cy.contains('Close').click();
    cy.contains('Yoga').should('not.exist');
  });

  it('refetches and updates UI after saving', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Massage{enter}');
    cy.contains('Save').click();
    cy.contains('Massage').should('exist');
  });

  it('does nothing if hotelId is missing', () => {
    cy.visit('/hotels/hotel-detail');
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').should('exist');
    cy.contains('Save').click();
  });

  it('resets unsaved changes when reopening the edit dialog', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Sauna{enter}');
    cy.contains('Close').click();
    cy.contains('Edit').click();
    cy.contains('Sauna').should('not.exist');
    cy.contains('WiFi').should('exist');
    cy.contains('Pool').should('exist');
  });
});
