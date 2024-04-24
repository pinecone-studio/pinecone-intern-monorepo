describe('home page', () => {
  beforeEach(() => cy.visit('/'));
  it('1.Page should have content', () => {
    cy.get('div').should('exist').should('be.visible');
    cy.get('h1').contains('hello from HRMS dashboard');
    cy.get('[data-cy="dashboardSidebar"]').should('exist');
    cy.get('[data-cy="dashboardSidebar').children().should('have.length', 4);
    cy.get('[data-cy="headerIcon"]').should('exist').should('be.visible');
    cy.get('[data-cy="headerMenu"]').should('exist').should('be.visible');
    cy.get('[data-cy="headerProfile"]').should('exist').should('be.visible');
  });
  it('2.Sidebar menu clickable and redirect to employee details page', () => {
    cy.get('[data-cy="sidebarItem"]').eq(1).should('exist').should('be.visible');
    cy.get('[data-cy="sidebarItem"]').eq(1).click();
  });
});
