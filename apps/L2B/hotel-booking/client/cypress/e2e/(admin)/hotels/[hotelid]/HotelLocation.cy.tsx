describe.only('HotelLocation Component', () => {
  let isUpdated = false;

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.alias = 'getHotel';

        req.reply({
          data: {
            hotel: {
              __typename: 'Hotel',
              id: '682f064a66e855f927b15767',
              name: 'Mock Hotel',
              location: isUpdated ? 'New Location' : 'Old Location',
              starRating: 4,
              rating: 4.5,
              description: 'Nice hotel',
              amenities: ['Wifi', 'Pool'],
              phone: '123-456-7890',
              images: [],
              createdAt: null,
              updatedAt: null,
            },
          },
        });
      }

      if (req.body.operationName === 'UpdateHotel') {
        req.alias = 'updateHotel';
        isUpdated = true;

        req.reply({
          data: {
            updateHotel: {
              __typename: 'Hotel',
              id: '682f064a66e855f927b15767',
              name: 'Mock Hotel',
              location: 'New Location',
              starRating: 4,
              rating: 4.5,
              description: 'Nice hotel',
              amenities: ['Wifi', 'Pool'],
              phone: '123-456-7890',
              images: [],
              createdAt: null,
              updatedAt: null,
            },
          },
        });
      }
    });
    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('should update the hotel location when saving', () => {
    cy.wait('@getHotel');

    cy.contains('Old Location');

    cy.get("[data-testid='edit-location']").click();

    cy.get('textarea').clear().type('New Location');
    cy.contains('Save').click();

    cy.wait('@updateHotel');
    cy.wait('@getHotel');

    cy.contains('New Location');
  });
});
