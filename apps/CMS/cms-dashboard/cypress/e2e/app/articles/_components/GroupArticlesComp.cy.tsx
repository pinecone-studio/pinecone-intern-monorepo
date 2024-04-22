describe('GroupArticlesComp', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders with correct props and structure', () => {
    cy.get('[data-testid="group-container"]').should('exist').and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box');
    cy.get('[data-testid="group-title"]').should('exist').and('have.css', 'color', 'rgb(0, 0, 0)');
    cy.get('[data-testid="group-icon-button"]').should('exist').children().click({ multiple: true, force: true });
  });
});
