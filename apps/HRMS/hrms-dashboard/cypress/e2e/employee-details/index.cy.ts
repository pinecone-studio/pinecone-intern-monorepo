describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('pagination component visible', () => {
    cy.get('ul li:first').click();
    cy.get('ul li').eq(2).click();
    cy.get('ul li:last').click();
  });

  it('Modal should open when click on add employee button', () => {
    cy.get('[data-testid="add-icon"]').should('exist');
    cy.get('[data-cy="addEmployeeBtn"]').should('exist').should('be.visible').click();
    cy.get('[data-cy="addEmployeeForm"]').should('exist').should('be.visible');
  });

  it('should open create employee form when add employee button is clicked', () => {
    cy.get('[data-cy="addEmployeeBtn"]').click();
    cy.get('[data-testid="create-employee"]').should('exist').should('be.visible');
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-cy="addEmployeeBtn"]').click();
    cy.get('[data-testid="create-employee"]').should('exist').should('be.visible');
  });
});
