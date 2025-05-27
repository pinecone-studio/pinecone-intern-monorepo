describe('HotelAmenities Component', () => {
  beforeEach(() => {
    cy.visit('/hotels/hotel-detail?hotelid=hotel123');

    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.reply({
          data: {
            hotel: {
              id: 'hotel123',
              amenities: ['WiFi', 'Pool'],
            },
          },
        });
      }

      if (req.body.operationName === 'UpdateHotel') {
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
  });

  it('opens dialog and adds a new amenity', () => {
    cy.contains('Edit').click();
    cy.get('[data-testid="amenities-input"]').type('Gym{enter}');
    cy.contains('Gym').should('exist');
  });

  it('saves changes and updates UI', () => {
    cy.contains('Edit').click();
    cy.get('input[placeholder*="e.g. Pool"]').type('Spa{enter}');
    cy.contains('Save').click();
    cy.contains('Spa').should('exist');
  });

  it('resets changes on Close', () => {
    cy.contains('Edit').click();
    cy.get('input[placeholder*="e.g. Pool"]').type('Massage{enter}');
    cy.contains('Close').click();
    cy.contains('Massage').should('not.exist'); // Shouldn't be saved
  });
});
