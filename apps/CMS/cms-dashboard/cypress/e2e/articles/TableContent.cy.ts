describe('Content Table list', () => {
  beforeEach(() => {
    cy.visit('/articles');
  });

  it('1.Table header should be visible', () => {
    cy.get('[data-cy="contentList"]').should('exist').should('be.visible');
    cy.get('[data-cy="tableHeader-0"]').should('be.visible').should('have.text', 'Нийтлэл');
    cy.get('[data-cy="tableHeader-1"]').should('be.visible').should('have.text', 'Статус');
    cy.get('[data-cy="tableHeader-2"]').should('be.visible').should('have.text', 'Огноо');
    cy.get('[data-cy="tableHeader-3"]').should('be.visible').should('have.text', 'Шошго');
    cy.get('[data-cy="tableHeader-4"]').should('be.visible').should('have.text', '');
  });
});
