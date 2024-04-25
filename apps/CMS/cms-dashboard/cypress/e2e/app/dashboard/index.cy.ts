describe('dashboard page', () => {
  beforeEach(() => cy.visit('/dashboard'));

  it('1. Should display welcome message', () => {
    cy.get('[data-cy="dashboard-table-cy"]').should('exist').should('be.visible');
  });

  it('2. Morevert button click', () => {
    cy.get('[data-cy="morevert-button-test-cy"]').eq(0).should('exist').click();
    cy.get('[data-cy="drop-down-menu-test-cy"]').eq(0).should('exist').click({ force: true });
  });

  it('3. MenuBar should be visible', () => {
    cy.get('[data-cy="menu-bar-cy-id"]').should('exist').should('be.visible')
  })
});
