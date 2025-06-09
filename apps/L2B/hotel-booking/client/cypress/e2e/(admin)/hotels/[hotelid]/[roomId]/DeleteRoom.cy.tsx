describe('Room Deletion Flow', () => {
  const roomId = 'test-room-id';
  const hotelId = 'test-hotel-id';
  const hotelName = 'Test Hotel';

  beforeEach(() => {
    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'Room') {
        req.reply({
          data: {
            room: {
              _id: roomId,
              name: 'Test Room',
              hotelId: {
                _id: hotelId,
                name: hotelName,
              },
            },
          },
        });
      }
    });

    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'DeleteRoom') {
        req.reply({
          data: {
            deleteRoom: {
              success: true,
            },
          },
        });
      }
    }).as('deleteRoom');

    cy.visit(`/hotels/${hotelId}/${roomId}`);
  });

  it('should show the delete button and confirmation dialog', () => {
    cy.get('button').contains('Delete Room').should('exist');

    cy.get('button').contains('Delete Room').click();

    cy.get('[role="dialog"]').should('be.visible');
    cy.get('[role="dialog"]').contains('Room delete?').should('be.visible');
    cy.get('[role="dialog"]').contains('This action cannot be undone').should('be.visible');

    cy.get('[role="dialog"]').contains('Cancel').should('be.visible');
    cy.get('[role="dialog"]').contains('Confirm Delete').should('be.visible');
  });

  it('should cancel deletion when clicking cancel', () => {
    cy.get('button').contains('Delete Room').click();

    cy.get('[role="dialog"]').contains('Cancel').click();

    cy.get('[role="dialog"]').should('not.exist');

    cy.url().should('include', `/hotels/${hotelId}/${roomId}`);
  });

  it('should successfully delete the room and navigate to hotel page', () => {
    cy.get('button').contains('Delete Room').click();

    cy.get('[role="dialog"]').contains('Confirm Delete').click();

    cy.wait('@deleteRoom');

    cy.url().should('include', `/hotels/${hotelId}`);
    cy.url().should('not.include', `/${roomId}`);

    cy.contains('Room deleted successfully').should('exist');
  });

  it('should show error message when deletion fails', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError');
    });

    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'DeleteRoom') {
        req.reply({
          statusCode: 500,
          body: {
            errors: [
              {
                message: 'Failed to delete room',
              },
            ],
          },
        });
      }
    }).as('deleteRoomError');

    cy.get('button').contains('Delete Room').click();

    cy.get('[role="dialog"]').contains('Confirm Delete').click();

    cy.wait('@deleteRoomError');

    cy.get('@consoleError').should('have.been.calledWith', 'Failed to delete room:', 'Response not successful: Received status code 500');

    cy.url().should('include', `/hotels/${hotelId}/${roomId}`);
  });
});
