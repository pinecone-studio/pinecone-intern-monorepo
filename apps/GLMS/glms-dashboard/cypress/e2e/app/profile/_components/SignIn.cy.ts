describe('SignIn component', () => {
  before(() => {
    cy.visit('/_components');
  });
  it('renders with correct structure', () => {
    cy.get('[data-testid="signin-article-detail"]').should('exist');
    cy.get('[data-testid="signin-article-detail"]').should('have.css', 'height', '1150px');
  });
  it('displays the corrent text', () => {
    cy.get('[data-testid="text-data-email"]').should('have.text').type('email');
    cy.get('[data-testid="text-data-password"]').should('have.text').type('password');
  });
  it('should click button', () => {
    cy.get('[data-testid="btn"]').should('have.css', 'background-color', '#000');
    cy.get('[data-testid="btn"]').click();
  });
  it('image', () => {
    cy.contains('Image.png');
  });
});
