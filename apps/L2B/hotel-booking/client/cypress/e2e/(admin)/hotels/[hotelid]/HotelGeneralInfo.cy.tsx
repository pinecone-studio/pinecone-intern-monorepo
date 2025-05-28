describe.only('HotelGeneralInfo Component', () => {
  let isUpdated = false;

  const mockHotel = (updated: boolean) => ({
    __typename: 'Hotel',
    id: '682ac7df47df32a8a9907cb1',
    name: 'Mock Hotel',
    description: updated ? 'Updated Description' : 'Initial Description',
    starRating: updated ? 5 : 3,
    rating: updated ? 9 : 7.5,
    phone: '987-654-3210',
    location: 'Somewhere',
    amenities: [],
    images: [],
    createdAt: null,
    updatedAt: null,
  });

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const handlers: Record<string, () => void> = {
        Hotel: () => {
          req.alias = 'getHotel';
          req.reply({ data: { hotel: mockHotel(isUpdated) } });
        },
        UpdateHotel: () => {
          req.alias = 'updateHotel';
          isUpdated = true;
          req.reply({ data: { updateHotel: mockHotel(true) } });
        },
      };

      const operation = req.body.operationName;
      if (operation && handlers[operation]) {
        handlers[operation]();
      }
    });

    const hotelId = '682ac7df47df32a8a9907cb1';
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('should render hotel general info correctly', () => {
    cy.wait('@getHotel');

    cy.contains('General Info');
    cy.contains('Mock Hotel');
    cy.contains('987-654-3210');
    cy.contains('Initial Description');
    cy.contains('7.5');
  });

  it('should allow editing and updating general info', () => {
    cy.wait('@getHotel');

    cy.get("[data-testid='edit-general']").click();

    cy.get('input').eq(0).clear().type('Mock Hotel');
    cy.get('textarea').clear().type('Updated Description');
    cy.get('input[type="number"]').clear().type('9');

    cy.get('[role="combobox"]').click();
    cy.contains('5 stars').click({ force: true });

    cy.contains('Save').click();

    cy.wait('@updateHotel');
    cy.wait('@getHotel');

    cy.contains('Updated Description');
    cy.get('[data-testid="star-icon-filled"]').should('have.length', 5);
  });
});
