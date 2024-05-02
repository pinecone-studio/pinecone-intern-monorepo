describe('ProfilePage Component', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('should render ProfilePage with correct content', () => {
    cy.contains('h1', 'hello from GLMS dashboard Profile Page').should('be.visible');
    cy.get('[data-testid="profile-main"]').should('exist');
    cy.get('[data-testid="profile-btn"]').should('exist');
  });

  it('should navigate to home page when "Go back to home page" button is clicked', () => {
    cy.get('[data-testid="profile-btn"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
