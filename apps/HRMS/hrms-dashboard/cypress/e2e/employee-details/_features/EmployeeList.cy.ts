describe('Employee list page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('1.Page header should be visible', () => {
    cy.get('[data-cy="employeePageTitle"]').should('be.visible').should('have.text', 'Ажилчид');
    cy.get('[data-cy="addEmployeeBtn"]').should('be.visible');
  });

  it('2.should display the correct number of employees in the table', () => {
    cy.get('[data-cy="employeesList"]').should('be.visible');
    cy.get('[data-testid="add-icon"]').should('exist');
  });

  it('3.should open create employee form when add employee button is clicked', () => {
    cy.get('[data-cy="addEmployeeBtn"]').click();
    cy.get('[data-testid="create-employee"]').should('exist').should('be.visible');
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-cy="addEmployeeBtn"]').click();
    cy.get('[data-testid="create-employee"]').should('exist').should('be.visible');
  });

  it('4.should navigate to the correct page when pagination button is clicked', () => {
    cy.get('ul li:first').click();
    cy.get('ul li').eq(3).click();
    cy.get('ul li:last').click();
  });

  it('5.employee input change value ', () => {
    const searchText = 'l';
    cy.get('[data-testid="employee-search"]').type(searchText);
  });
});
