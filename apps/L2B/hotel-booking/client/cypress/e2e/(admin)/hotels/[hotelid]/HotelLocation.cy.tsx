describe.only('HotelLocation Component', () => {
  const hotelId = '682ac7df47df32a8a9907cb1';
  const hotelData = (location: string | null) => ({
    __typename: 'Hotel',
    id: '682f064a66e855f927b15767',
    name: 'Mock Hotel',
    location,
    starRating: 4,
    rating: 4.5,
    description: 'Nice hotel',
    amenities: ['Wifi', 'Pool'],
    phone: '123-456-7890',
    images: [],
    createdAt: null,
    updatedAt: null,
  });

  let isUpdated = false;

  const interceptHotel = () =>
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.alias = 'getHotel';
        req.reply({ data: { hotel: hotelData(isUpdated ? 'New Location' : 'Old Location') } });
      }
      if (req.body.operationName === 'UpdateHotel') {
        req.alias = 'updateHotel';
        isUpdated = true;
        req.reply({ data: { updateHotel: hotelData('New Location') } });
      }
    });

  beforeEach(() => {
    isUpdated = false;
    interceptHotel();
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('updates hotel location when saving', () => {
    cy.wait('@getHotel');
    cy.contains('Old Location');
    cy.get("[data-testid='edit-location']").click();
    cy.get('textarea').clear().type('New Location');
    cy.contains('Save').click();
    cy.wait('@updateHotel');
    cy.wait('@getHotel');
    cy.contains('New Location');
  });

  it('closes dialog without saving', () => {
    isUpdated = true;
    cy.wait('@getHotel');
    cy.get("[data-testid='edit-location']").click();
    cy.get('textarea').clear().type('Unsaved Location');
    cy.get("[data-testid='close-dialog']").click();
    cy.get('textarea').should('not.exist');
    cy.contains('New Location');
  });

  it('shows fallback when location is not available', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.reply({ data: { hotel: hotelData(null) } });
      }
    });
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.contains('Location not available');
  });

  it('disables save button during mutation', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateHotel') {
        req.alias = 'updateHotel';
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            req.reply({ data: { updateHotel: hotelData('New Location') } });
            resolve();
          }, 500);
        });
      }
    });

    cy.wait('@getHotel');
    cy.get("[data-testid='edit-location']").click();
    cy.get('textarea').clear().type('New Location');
    cy.contains('Save').click();
    cy.get('button').contains('Saving...').should('be.disabled');
  });

  it('opens and closes dialog with onOpenChange', () => {
    cy.wait('@getHotel');
    cy.get("[data-testid='edit-location']").click();
    cy.get('textarea').should('exist');
    cy.get('body').type('{esc}');
    cy.get('textarea').should('not.exist');
  });
});
