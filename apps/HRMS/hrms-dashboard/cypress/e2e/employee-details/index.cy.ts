describe('Employee Details page', () => {
  beforeEach(() => cy.visit('/employee-details'));

  it('Modal should be open when click on button', () => {
    cy.get('[data-testid="addEmployeeBtn"]').contains('Ажилтан нэмэх').should('exist');
    cy.get('[data-testid="add-icon"]').should('exist');
    cy.get('[data-testid="addEmployeeBtn"]').should('exist').click();
  });

  it('Seen modal', () => {
    cy.get('[data-testid="addEmployeeBtn"]').should('exist').click();
    cy.get('[data-testid="modalContent"]').should('exist').should('be.visible');
    cy.get('[data-testid="title"]').should('exist').should('be.visible').contains('Ажилтан нэмэх');
    cy.get('[data-testid="arrow-icon"]').should('exist');
    cy.get('[data-testid="SubmitBtn"]').should('exist').should('be.visible').contains('Дараах');
    cy.get('[data-testid="x-icon"]').should('exist');
    cy.get('[data-testid="closeBtn"]').should('exist').click();
  });
});
