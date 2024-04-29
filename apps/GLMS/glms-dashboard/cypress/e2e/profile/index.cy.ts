describe('ProfilePage Component', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'HelloQueryFromProfileService') {
        req.alias = 'helloQueryFromProfileServiceQuery';
        req.reply({
          statusCode: 200,
          body: {
            data: {
              helloQueryFromProfileService: 'Hello from Profile Service',
            },
          },
        });
      }
    });

    cy.visit('/profile');
  });

  it('should render ProfilePage with correct content', () => {
    cy.contains('h1', 'hello from GLMS dashboard Profile Page').should('be.visible');

    cy.get('[data-testid="profile-main"]').should('exist');
  });
});
