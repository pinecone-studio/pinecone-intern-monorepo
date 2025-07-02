describe('RoomServices Component', () => {
  const roomId = '6837cc8c8b71557eb9b072e7';
  const hotelId = '682ac7df47df32a8a9907cb1';
  let isUpdated = false;
  const CATEGORIES = [
    { key: 'bathroom', label: 'Bathroom' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'entertainment', label: 'Entertainment' },
    { key: 'internet', label: 'Internet' },
    { key: 'bedroom', label: 'Bedroom' },
    { key: 'other', label: 'Other' },
  ];
  const mockRoom = (updated: boolean) => ({
    __typename: 'Room',
    _id: roomId,
    name: 'Deluxe Suite',
    services: updated
      ? {
          bathroom: ['Shower', 'Toiletries'],
          accessibility: ['Wheelchair accessible'],
          entertainment: ['TV'],
          internet: ['Wi-Fi'],
          foodAndDrink: ['Minibar'],
          bedroom: ['King bed'],
          other: ['Balcony', 'Sea view'],
        }
      : {
          bathroom: ['Shower', 'Bathtub'],
          accessibility: ['Wheelchair accessible'],
          entertainment: ['TV'],
          internet: ['Wi-Fi'],
          foodAndDrink: ['Minibar'],
          bedroom: ['King bed'],
          other: ['Balcony'],
        },
    hotelId: { _id: hotelId, name: 'Grand Hotel' },
  });
  const setupGraphQLIntercept = () => {
    cy.intercept('POST', '**/graphql', (req) => {
      const operation = req.body.operationName as 'room' | 'updateRoom' | undefined;
      const handlers = {
        room: () => req.reply({ data: { room: mockRoom(isUpdated) } }),
        updateRoom: () => {
          isUpdated = true;
          req.reply({ data: { updateRoom: mockRoom(true) } });
        },
      };

      if (operation && operation in handlers) {
        handlers[operation]();
      } else {
        req.reply({ data: { room: mockRoom(isUpdated) } });
      }
    }).as('graphqlRequest');
  };
  const setupEmptyServicesIntercept = () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('room')) {
        req.reply({
          data: {
            room: {
              __typename: 'Room',
              _id: roomId,
              name: 'Deluxe Suite',
              services: {},
              hotelId: { _id: hotelId, name: 'Grand Hotel' },
            },
          },
        });
      }
    }).as('getRoomEmptyServices');
  };
  const verifyServicesDisplay = (services: Record<string, string[]>) => {
    CATEGORIES.forEach(({ key, label }) => {
      cy.get(`[data-cy="service-category-${key}"]`).within(() => {
        cy.get(`[data-cy="service-category-display-${key}"]`).should('contain.text', label);
        (services[key] || []).forEach((service) => {
          cy.get(`[data-cy="service-badge-${service.toLowerCase().replace(/\s+/g, '-')}"]`).should('contain.text', service);
        });
      });
    });
  };

  beforeEach(() => {
    setupGraphQLIntercept();
    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@graphqlRequest');
  });

  it('should display initial services correctly', () => {
    verifyServicesDisplay(mockRoom(false).services);
  });

  it('should add a service with enter key', () => {
    cy.get('[data-cy="edit-services-button"]').click();
    cy.get('[data-cy="service-input-field-bathroom"]').type('Toiletries{enter}');
    cy.get('[data-cy="service-badge-toiletries"]').should('exist');
    cy.get('[data-cy="services-save-button"]').click();
    cy.wait('@graphqlRequest').its('request.body.operationName').should('eq', 'UpdateRoom');
  });

  it('should remove a service with backspace', () => {
    cy.get('[data-cy="edit-services-button"]').click();
    cy.get('[data-cy="room-services-form"]').within(() => {
      cy.get('[data-cy="service-input-bathroom"]').within(() => {
        cy.get('[data-cy="service-input-field-bathroom"]').type('{backspace}');
        cy.get('[data-cy="service-badge-bathtub"]').should('exist');
      });
      cy.get('[data-cy="services-save-button"]').click();
    });
    cy.wait('@graphqlRequest')
      .its('request.body.variables.input.services')
      .should('deep.include', {
        bathroom: ['Shower', 'Bathtub'],
      });
  });

  it('should not add duplicate services', () => {
    cy.get('[data-cy="edit-services-button"]').click();
    cy.get('[data-cy="service-input-field-bathroom"]').type('Shower{enter}Shower{enter}');
    cy.get('[data-cy="service-badge-shower"]').should('have.length', 2);
    cy.get('[data-cy="services-save-button"]').click();
    cy.wait('@graphqlRequest')
      .its('request.body.variables.input.services')
      .should('deep.include', { bathroom: ['Shower', 'Bathtub', 'ShowerShower'] });
  });

  it('should close dialog and reset changes', () => {
    cy.get('[data-cy="edit-services-button"]').click();
    cy.get('[data-cy="service-input-field-bathroom"]').type('Toiletries{enter}');
    cy.get('[data-cy="services-cancel-button"]').click();
    cy.get('[data-cy="service-badge-toiletries"]').should('exist');
  });

  it('should handle empty services', () => {
    setupEmptyServicesIntercept();
    cy.visit(`/hotels/${hotelId}/${roomId}`);
    cy.wait('@getRoomEmptyServices');
    CATEGORIES.forEach(({ key }) => {
      cy.get(`[data-cy="no-services-${key}"]`).should('contain.text', '-/-');
    });
  });

  it('should disable save button when loading', () => {
    cy.get('[data-cy="edit-services-button"]').click();
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'updateRoom') {
        req.reply((res) => {
          res.setDelay(1000);
          res.send({ data: { updateRoom: mockRoom(true) } });
        });
      }
    }).as('updateRoomDelayed');
    cy.get('[data-cy="services-save-button"]').click();
  });
});
