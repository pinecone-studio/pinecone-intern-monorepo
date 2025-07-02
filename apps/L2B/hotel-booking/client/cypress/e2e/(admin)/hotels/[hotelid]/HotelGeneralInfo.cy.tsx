describe.only('HotelGeneralInfo Component', () => {
  let isUpdated = false;
  const hotelId = '682f064a66e855f927b15767';

  const mockHotel = (overrides = {}) => ({
    __typename: 'Hotel',
    id: hotelId,
    name: 'Mock Hotel',
    description: isUpdated ? 'Updated Description' : 'Initial Description',
    starRating: isUpdated ? 5 : 3,
    rating: isUpdated ? 9 : 7.5,
    phone: '987-654-3210',
    location: 'Somewhere',
    amenities: [],
    images: [],
    createdAt: null,
    updatedAt: null,
    ...overrides,
  });

  const interceptGraphQL = (customHotel?: Record<string, any>) => {
    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body?.operationName;

      if (op === 'Hotel') {
        req.alias = 'getHotel';
        req.reply({ data: { hotel: customHotel ?? mockHotel() } });
      } else if (op === 'UpdateHotel') {
        req.alias = 'updateHotel';
        isUpdated = true;
        req.reply({ data: { updateHotel: mockHotel() } });
      }
    });
  };

  beforeEach(() => {
    isUpdated = false;
    interceptGraphQL();
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
  });

  it('renders hotel general info', () => {
    cy.wait('@getHotel');
    cy.contains('General Info');
    cy.contains('Mock Hotel');
    cy.contains('987-654-3210');
    cy.contains('Initial Description');
    cy.contains('7.5');
  });

  it('allows editing and updating general info', () => {
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

  it('shows fallback if phone and description are missing', () => {
    interceptGraphQL(mockHotel({ phone: null, description: null }));
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.contains('phone not available');
    cy.contains('description not available');
  });

  it('renders correct star count', () => {
    interceptGraphQL(mockHotel({ starRating: 5 }));
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get('[data-testid="star-icon-filled"]').should('have.length', 5);
  });

  it('falls back to 0 stars when starRating is missing', () => {
    interceptGraphQL(mockHotel({ starRating: null }));
    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get('[data-testid="star-icon-filled"]').should('have.length', 0);
  });

  it('does not render form if hotel is null (Line 54 coverage)', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'Hotel') {
        req.alias = 'getHotel';
        req.reply({ data: { hotel: null } });
      }
    });

    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.contains('Save').should('not.exist');
  });

  it('shows error on failed mutation (Line 101 coverage)', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body.operationName;
      if (op === 'Hotel') {
        req.alias = 'getHotel';
        req.reply({ data: { hotel: mockHotel() } });
      } else if (op === 'UpdateHotel') {
        req.alias = 'updateHotel';
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Mock error' }] } });
      }
    });

    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get("[data-testid='edit-general']").click();
    cy.contains('Save').click();
    cy.wait('@updateHotel');
    cy.contains('Save');
  });

  it('shows loading state while saving (Line 119 coverage)', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body.operationName;
      if (op === 'Hotel') {
        req.alias = 'getHotel';
        req.reply({ data: { hotel: mockHotel() } });
      } else if (op === 'UpdateHotel') {
        req.alias = 'updateHotel';
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(req.reply({ data: { updateHotel: mockHotel() } }));
          }, 1000);
        });
      }
    });

    cy.visit(`/hotels/hotel-detail?hotelid=${hotelId}`);
    cy.wait('@getHotel');
    cy.get("[data-testid='edit-general']").click();
    cy.contains('Save').click();
    cy.contains('Saving...');
  });

  // it('allows selecting a star rating and closing the dialog', () => {
  //   cy.wait('@getHotel');
  //   cy.get("[data-testid='edit-general']").click();
  //   cy.get('[data-testid="star-rating-select"]').click();
  //   cy.contains('Close').click();
  //   cy.get('[role="dialog"]').should('not.exist');
  // });
});
