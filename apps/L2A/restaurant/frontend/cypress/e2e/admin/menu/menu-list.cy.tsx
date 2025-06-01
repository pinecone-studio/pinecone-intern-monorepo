describe('MenuList and DeleteUpdateDialog Integration', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const { operationName } = req.body;

      if (operationName === 'GetCategories') {
        req.reply({
          data: {
            getCategories: [
              { _id: '1', name: 'Category A', createdAt: '', updatedAt: '' },
              { _id: '2', name: 'Category B', createdAt: '', updatedAt: '' },
            ],
          },
        });
      }

      if (operationName === 'DeleteCategory') {
        req.reply({
          data: {
            deleteCategory: { _id: '1', name: 'Category A' },
          },
        });
      }
    }).as('graphql');

    cy.visit('/admin/menu');
    cy.get('[data-testid="tab-manage"]').should('exist').click();
    cy.wait('@graphql');
  });

  it('renders categories and deletes one successfully', () => {
    cy.get('[data-testid="category-row-1"]').should('contain', 'Category A');
    cy.get('[data-testid="category-row-2"]').should('contain', 'Category B');
    cy.get('[data-testid="category-1-delete-button"]').click();
    cy.get('[data-testid="category-1-dialog"]').should('be.visible');
    cy.get('[data-testid="delete-submit"]').click();
    cy.contains('Амжилттай устгалаа!').should('be.visible');
    cy.get('[data-testid="category-1-dialog"]').should('not.exist');

    cy.log('✅ Test complete');
  });
});
