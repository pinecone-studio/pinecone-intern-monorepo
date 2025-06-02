describe('RoomGeneralInfo Component', () => {
  const roomId = '6837cc8c8b71557eb9b072e7';
  const hotelId = '682ac7df47df32a8a9907cb1';
  let isUpdated = false;

  const mockRoom = (updated: boolean) => ({
    __typename: 'Room',
    _id: roomId,
    name: updated ? 'Updated Deluxe Suite' : 'Deluxe Suite',
    type: 'Suite',
    pricePerNight: updated ? 250 : 200,
    roomNumber: 101,
    isAvailable: true,
    information: updated ? ['20 sq m', 'Balcony'] : ['18 sq m', 'Private bathroom'],
    images: ['/image1.jpg', '/image2.jpg'],
    services: {
      bathroom: ['Shower'],
      accessibility: [],
      entertainment: [],
      internet: [],
      foodAndDrink: [],
      bedroom: [],
      other: [],
    },
    hotelId: {
      _id: hotelId,
      name: 'Grand Hotel',
    },
  });

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
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

      if (operation && handlers[operation]) {
        handlers[operation]();
      } else if (req.body.query.includes('room')) {
        req.alias = 'getRoom';
        req.reply({ data: { room: mockRoom(isUpdated) } });
      }
    }).as('graphqlRequest');

    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@graphqlRequest');
  });

  it('should render room general info correctly', () => {
    cy.get('[data-cy="room-general-info"]').within(() => {
      cy.get('[data-cy="room-details-section"]').within(() => {
        cy.get('[data-cy="room-detail-name"]').should('contain.text', 'Deluxe Suite');
        cy.get('[data-cy="room-detail-type"]').should('contain.text', 'Suite');
        cy.get('[data-cy="room-detail-price"]').should('contain.text', '200₮');
      });
      cy.get('[data-cy="information-section"]').within(() => {
        cy.get('[data-cy="information-item-18-sq-m"]').should('contain.text', '18 sq m');
        cy.get('[data-cy="information-item-private-bathroom"]').should('contain.text', 'Private bathroom');
      });
    });
  });

  it('should allow editing and updating general info', () => {
    cy.get('[data-cy="edit-general-info-button"]').click();
    cy.get('[data-cy="room-general-info-form"]').within(() => {
      cy.get('[data-testid="input-name"]').clear().type('Updated Deluxe Suite');
      cy.get('[data-testid="input-pricePerNight"]').clear().type('250');
      cy.get('[data-testid="input-roomNumber"]').clear().type('101');
      cy.get('[data-testid="checkbox-available"]').should('be.checked');
      cy.get('[data-testid="information-input"]').within(() => {
        cy.get('[data-testid="info-input"]').type('Balcony{enter}');
        cy.get('[data-testid="info-badge-balcony"]').should('not.exist');
      });
      cy.get('[data-testid="button-save"]').click();
    });
    cy.wait('@graphqlRequest').its('request.body.operationName').should('eq', 'UpdateRoom');
    cy.get('[data-cy="room-details-section"]').within(() => {
      cy.get('[data-cy="room-detail-name"]').should('contain.text', 'NameDeluxe Suite');
      cy.get('[data-cy="room-detail-price"]').should('contain.text', 'Price200₮');
    });
    cy.get('[data-cy="information-section"]').within(() => {
      cy.get('[data-cy="information-item-balcony"]').should('contain.text', 'Balcony');
    });
  });

  it('should handle empty information gracefully', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('room')) {
        req.reply({
          data: {
            room: { ...mockRoom(false), information: [] },
          },
        });
      }
    }).as('getRoomEmptyInfo');
    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@getRoomEmptyInfo');
    cy.get('[data-cy="information-section"]').within(() => {
      cy.get('[data-cy="no-information-text"]').should('contain.text', '-/-');
    });
  });

  it('should close dialog without saving', () => {
    cy.get('[data-cy="edit-general-info-button"]').click();
    cy.get('[data-cy="room-general-info-form"]').within(() => {
      cy.get('[data-testid="input-name"]').clear().type('Temporary Name');
      cy.get('[data-testid="button-close"]').click();
    });
    cy.get('[data-cy="room-details-section"]').within(() => {
      cy.get('[data-cy="room-detail-name"]').should('contain.text', 'Deluxe Suite');
    });
  });

  it('should disable save button when loading', () => {
    cy.get('[data-cy="edit-general-info-button"]').click();
    cy.get('[data-cy="room-general-info-form"]').within(() => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'updateRoom') {
          req.reply((res) => {
            res.setDelay(1000);
            res.send({ data: { updateRoom: mockRoom(true) } });
          });
        }
      }).as('updateRoomDelayed');
      cy.get('[data-testid="button-save"]').click();
    });
  });
});
