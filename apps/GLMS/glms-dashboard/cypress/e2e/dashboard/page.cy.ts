describe('dashboardOtherLab component', () => {
  beforeEach(() => {
    cy.visit('/dashboardOtherLab');
  });

  it('Should display Dashboard Lab page', () => {
    cy.get('[data-cy="Dashboard-Lab-Page"]').should('exist').should('be.visible');
  });

  it('Should display Ноорог section on Dashboard Lab page', () => {
    cy.get('[data-cy="Ноорог"]').should('exist').should('be.visible');
    cy.get('[data-cy="Ноорог"]').click();
  });

  it('Should display Архив section on Dashboard Lab page', () => {
    cy.get('[data-cy="Архив"]').should('exist').should('be.visible');
    cy.get('[data-cy="Архив"]').click();
  });
});
