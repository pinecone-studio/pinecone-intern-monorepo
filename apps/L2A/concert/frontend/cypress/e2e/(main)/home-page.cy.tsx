describe('Render event menu', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('renders dashboard with concerts and hero section', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'Concerts') {
        req.reply({
          data: {
            concerts: [
              {
                __typename: 'Concert',
                id: '1',
                artistName: 'Mock Artist',
                title: 'Mock Concert',
                thumbnailUrl: '/placeholder.webp',
                musicStart: '18:00',
                seatData: [{ __typename: 'SeatData', id: 's1', date: '2025-01-01', totalSeats: 100, availableSeats: 50 }],
                doorOpen: '17:00',
                endDate: '2025-01-01T20:00:00Z',
                primaryPrice: 100,
                venue: {
                  __typename: 'Venue',
                  id: 'v1',
                  name: 'Mock Venue',
                  address: '123 Main St',
                  city: 'City',
                  capacity: 1000,
                },
                specialGuestName: null,
              },
            ],
          },
        });
      }
      if (req.body.operationName === 'FeaturedEvents') {
        req.reply({
          data: {
            featuredEvents: [
              {
                __typename: 'Concert',
                id: 'f1',
                artistName: 'Featured Artist',
                title: 'Featured Concert',
                thumbnailUrl: '/placeholder.webp',
                musicStart: '20:00',
                seatData: [{ __typename: 'SeatData', id: 's2', date: '2025-01-02', totalSeats: 200, availableSeats: 120 }],
                doorOpen: '19:00',
                endDate: '2025-01-02T22:00:00Z',
                primaryPrice: 120,
                venue: {
                  __typename: 'Venue',
                  id: 'v2',
                  name: 'Featured Venue',
                  address: '456 Center St',
                  city: 'City',
                  capacity: 2000,
                },
                specialGuestName: null,
              },
              {
                __typename: 'Concert',
                id: 'f2',
                artistName: 'Featured Artist',
                title: 'Featured Concert',
                thumbnailUrl: null,
                musicStart: '20:00',
                seatData: [{ __typename: 'SeatData', id: 's2', date: '2025-01-02', totalSeats: 200, availableSeats: 120 }],
                doorOpen: '19:00',
                endDate: '2025-01-02T22:00:00Z',
                primaryPrice: 120,
                venue: {
                  __typename: 'Venue',
                  id: 'v2',
                  name: 'Featured Venue',
                  address: '456 Center St',
                  city: 'City',
                  capacity: 2000,
                },
                specialGuestName: null,
              },
            ],
          },
        });
      }
    }).as('getGraphQL');

    cy.visit('/');
    cy.wait('@getGraphQL');

    cy.get('[data-testid="dashboard"]').should('exist');
    cy.get('[data-testid="hero-section"]').should('exist');
    cy.get('[data-testid="concert-card"]').should('have.length.at.least', 1);
  });

  it('shows no concerts message when concert list is empty', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'concerts') {
        req.reply({ data: { concerts: [] } });
      }
    }).as('getGraphQL');

    cy.visit('/');
    cy.wait('@getGraphQL');

    cy.contains('Концерт алга').should('exist');
  });

  it('shows no concerts message when concert list is empty', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'FeaturedEvents') {
        req.reply({ data: { featuredEvents: [] } });
      }
    }).as('getGraphQL');

    cy.visit('/');
    cy.wait('@getGraphQL');
  });

  it('shows error message when concerts query fails', () => {
    cy.intercept('POST', '**/api/graphql', (req) => {
      if (req.body.operationName === 'concerts') {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Oops' }] } });
      }
      if (req.body.operationName === 'FeaturedEvents') {
        req.reply({ data: { featuredEvents: [] } });
      }
    }).as('getGraphQL');

    cy.visit('/');
    cy.wait('@getGraphQL');

    cy.contains('Алдаа').should('exist');
  });
});
