describe('dashboardOtherLab component', () => {
  beforeEach(() => {
    cy.visit('/dashboardOtherLab');
  });
  it('Should display Dashboard Lab page', () => {
    cy.get('[data-cy="Dashboard-Lab-Page"]').should('exist').should('be.visible');
  });
});
