describe('RoomDetailPage', () => {
  const roomId = '6837cc8c8b71557eb9b072e7';
  const hotelId = '682ac7df47df32a8a9907cb1';
  let isUpdated = false;

  const mockRoom = (updated: boolean) => ({
    __typename: 'Room',
    _id: roomId,
    name: 'Deluxe Suite',
    type: 'Suite',
    pricePerNight: updated ? 250 : 200,
    roomNumber: 101,
    isAvailable: true,
    information: updated ? ['20 sq m', 'Balcony'] : ['18 sq m', 'Private bathroom'],
    images: updated ? ['/updated-image.jpg'] : ['/image1.jpg', '/image2.jpg'],
    services: {
      bathroom: ['Shower', 'Bathtub'],
      accessibility: ['Wheelchair accessible'],
      entertainment: ['TV'],
      internet: ['Wi-Fi'],
      foodAndDrink: ['Minibar'],
      bedroom: ['King bed'],
      other: updated ? ['Balcony', 'Sea view'] : ['Balcony'],
    },
    hotelId: {
      _id: hotelId,
      name: 'Grand Hotel',
    },
  });

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      console.log('GraphQL Request:', req.body);
      const operation = req.body.operationName;
      const handlers: Record<string, () => void> = {
        room: () => {
          req.alias = 'getRoom';
          req.reply({ data: { room: mockRoom(isUpdated) } });
        },
        updateRoom: () => {
          req.alias = 'updateRoom';
          isUpdated = true;
          req.reply({ data: { updateRoom: mockRoom(true) } });
        },
      };

      // Fallback for any operation name to catch mismatches
      if (operation && handlers[operation]) {
        handlers[operation]();
      } else if (req.body.query.includes('room')) {
        req.alias = 'getRoom';
        req.reply({ data: { room: mockRoom(isUpdated) } });
      }
    }).as('graphqlRequest');

    cy.visit(`/hotels/${hotelId}/${roomId}`, {
      onBeforeLoad: (win) => {
        cy.spy(win.console, 'log').as('consoleLog');
      },
    });
  });

  it('should render breadcrumbs correctly', () => {
    cy.wait('@graphqlRequest').then((interception) => {
      expect(interception.request.body.query).to.include('room');
    });
    cy.get('[data-cy="breadcrumbs"]').within(() => {
      cy.get('[data-cy="breadcrumb-hotels"]').should('have.text', 'Hotels').and('have.attr', 'href', '/hotels');
      cy.get('[data-cy="breadcrumb-hotel"]').should('have.text', 'Grand Hotel').and('have.attr', 'href', `/hotels/${hotelId}`);
      cy.get('[data-cy="breadcrumb-room"]').should('have.text', 'Room Detail');
    });
  });

  it('should render room detail page components', () => {
    cy.wait('@graphqlRequest');
    cy.get('[data-cy="room-detail-page"]').should('exist');
    cy.get('[data-cy="room-general-info"]').should('exist');
    cy.get('[data-cy="room-services"]').should('exist');
    cy.get('[data-cy="room-images"]').should('exist');
  });

  it('should handle loading state', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('room')) {
        req.reply((res) => {
          res.setDelay(1000);
          res.send({ data: { room: mockRoom(isUpdated) } });
        });
      }
    }).as('getRoomDelayed');
    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.get('[data-cy="loading-state"]').should('contain.text', 'Loading...');
    cy.wait('@getRoomDelayed');
    cy.get('[data-cy="room-detail-page"]').should('exist');
  });
});
