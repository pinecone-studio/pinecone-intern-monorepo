describe('Home Page GraphQL E2E Interactions', () => {
  const loggedInUserId = '68639484a94a2ebfd7cccae5';

  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const op = req.body.operationName;
      if (op === 'GetUsers') {
        req.reply({
          data: {
            getusers: [
              {
                id: '1',
                name: 'Alice',
                age: 28,
                images: ['https://example.com/alice.jpg'],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
              {
                id: loggedInUserId,
                name: 'You',
                age: 30,
                images: [],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
            ],
          },
        });
      } else if (op === 'Like') {
        req.reply({
          data: {
            like: "🎉 It's a match!",
          },
        });
      } else if (op === 'DislikeFromFile') {
        req.reply({
          data: {
            dislike: true,
          },
        });
      }
    }).as('graphqlReq');

    cy.visit('/');
  });
  it('loads profiles and displays the first user', () => {
    cy.contains('Loading...').should('be.visible');
    cy.wait('@graphqlReq');
    cy.contains('Alice, 28').should('be.visible');
    cy.get('img').should('have.attr', 'src').and('include', 'alice.jpg');
  });

  it('sends like mutation and shows match alert', () => {
    cy.wait('@graphqlReq');
    cy.get('[data-testid="like"]').click();
    cy.wait('@graphqlReq');
    cy.on('window:alert', (msg) => {
      expect(msg).to.eq("It's a match!");
    });
  });

  it('sends dislike mutation and continues to next state', () => {
    cy.wait('@graphqlReq');
    cy.get('[data-testid="dislike"]').click();
    cy.wait('@graphqlReq');
    cy.contains('No more profiles').should('be.visible');
  });
  it('handles like mutation error gracefully', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetUsers') {
        req.reply({
          data: {
            getusers: [
              {
                id: '1',
                name: 'Bob',
                age: 26,
                images: ['https://example.com/bob.jpg'],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
              {
                id: loggedInUserId,
                name: 'You',
                age: 30,
                images: [],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
            ],
          },
        });
      } else if (req.body.operationName === 'Like') {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Server error' }] } });
      } else if (req.body.operationName === 'DislikeFromFile') {
        req.reply({ data: { dislike: true } });
      }
    });
    cy.visit('/');
    cy.wait('@graphqlReq');
    cy.on('window:alert', (msg) => {
      expect(msg).to.eq('Error liking user');
    });
    cy.get('[data-testid="like"]').click();
    cy.wait('@graphqlReq');
  });
  it('handles dislike mutation error gracefully', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetUsers') {
        req.reply({
          data: {
            getusers: [
              {
                id: '1',
                name: 'Charlie',
                age: 24,
                images: ['https://example.com/charlie.jpg'],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
              {
                id: loggedInUserId,
                name: 'You',
                age: 30,
                images: [],
                likedBy: [],
                likedTo: [],
                matched: [],
              },
            ],
          },
        });
      } else if (req.body.operationName === 'Like') {
        req.reply({ data: { like: null } });
      } else if (req.body.operationName === 'DislikeFromFile') {
        req.reply({ statusCode: 500, body: { errors: [{ message: 'Server error' }] } });
      }
    });
    cy.visit('/');
    cy.wait('@graphqlReq');
    cy.on('window:alert', (msg) => {
      expect(msg).to.eq('Error disliking user');
    });
    cy.get('[data-testid="dislike"]').click();
    cy.wait('@graphqlReq');
  });
});
