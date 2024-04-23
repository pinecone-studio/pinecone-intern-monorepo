describe('home page', () => {
  beforeEach(() => cy.visit('/'));
  it('1.Page should have content', () => {
    cy.get('div').should('exist').should('be.visible');
  });
  it('2.Should display welcome message', () => {
    cy.get('h1').contains('hello from HRMS dashboard');
  });
  it('3.Dashboard side bar should be visible', () => {
    cy.get('[data-cy="dashboardSidebar"]').should('exist');
  });
  it('4.Sidebar menu clickable and redirect to employee details page', () => {
    cy.get('[data-cy="sidebarItem-1"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/employee-details');
  });
  it('5.Sidebar menu clickable and redirect to leaving page', () => {
    cy.get('[data-cy="sidebarItem-2"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/leaving');
  });
  it('6.Sidebar menu clickable and redirect to recruiting page', () => {
    cy.get('[data-cy="sidebarItem-3"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/recruiting');
  });
  it('7.Sidebar menu clickable and redirect to home page', () => {
    cy.get('[data-cy="sidebarItem-0"]').should('exist').should('be.visible').click();
    cy.url().should('include', '/');
  });
  it('8.Header items visible', () => {
    cy.get('[data-cy="headerIcon"]').should('exist').should('be.visible');
    cy.get('[data-cy="headerMenu"]').should('exist').should('be.visible');
    cy.get('[data-cy="headerProfile"]').should('exist').should('be.visible');
  });
});
