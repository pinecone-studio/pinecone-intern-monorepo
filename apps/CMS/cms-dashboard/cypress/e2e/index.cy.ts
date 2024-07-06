describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the correct heading', () => {
    cy.contains('h1', 'hello from Home dashboard').should('exist');
  });

  it('should display the environment variable', () => {
    // You need to set the environment variable when running Cypress tests
    const env = Cypress.env('ENVIRONMENT') || 'development';
    cy.contains('h1', `This is the environment ${env}`).should('exist');
  });
});
