describe('employee-details', () => {
  beforeEach(() => cy.visit('/employee-details'));
  it('1.Page should have content', () => {
    cy.get('[data-cy="dashboardSidebar"]').should('exist');
    cy.get('[data-cy="dashboardSidebar').children().should('have.length', 4);
  });
  it('2.Sidebar menu clickable and redirect to employee details page', () => {
    cy.get('[data-cy="sidebarItem"]').eq(1).should('exist').should('be.visible');
    cy.get('[data-cy="sidebarItem"]').eq(1).click();
  });
});
