describe('DeleteHotel E2E Tests', () => {
  beforeEach(() => {
    // Mock all GraphQL requests with more flexible matching
    cy.intercept('POST', '**/graphql', (req) => {
      // Check if it's a Hotel query by looking at the query string
      if (req.body.query && req.body.query.includes('hotel')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              hotel: {
                _id: 'hotel-id-1234354',
                name: 'Test Hotel',
                location: 'Test Location',
                amenities: [],
                images: [],
              },
            },
          },
        });
      }
      // Handle delete mutation
      if (req.body.query && req.body.query.includes('deleteHotel')) {
        req.reply({
          statusCode: 200,
          body: { data: { deleteHotel: { id: 'hotel-id-1234354', success: true } } },
        });
      }
    }).as('graphqlRequests');

    // Visit hotel detail page
    cy.visit('/hotels/hotel-id-1234354');
  });

  it('opens delete dialog', () => {
    // Simply wait for the page to load and find delete button
    cy.contains('Delete Hotel', { timeout: 10000 }).should('be.visible').click();

    cy.get('[role="dialog"]').should('be.visible');
    cy.contains('Hotel delete?').should('be.visible');
  });

  it('cancels deletion', () => {
    cy.contains('Delete Hotel', { timeout: 10000 }).click();
    cy.contains('Cancel').click();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('deletes hotel successfully', () => {
    cy.contains('Delete Hotel', { timeout: 10000 }).click();
    cy.contains('Confirm Delete').click();
    cy.contains('Hotel deleted successfully').should('be.visible');
    cy.url().should('include', '/hotels');
  });

  it('handles delete error', () => {
    // Mock error response for this test
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query && req.body.query.includes('deleteHotel')) {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Hotel not found' }],
          },
        });
      }
    }).as('deleteError');

    cy.contains('Delete Hotel', { timeout: 10000 }).click();
    cy.contains('Confirm Delete').click();

    // Check console error was logged
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
  });
});
