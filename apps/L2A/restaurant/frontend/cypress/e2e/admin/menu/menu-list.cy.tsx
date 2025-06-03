describe('MenuList + DeleteUpdateDialog integration', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      const { operationName } = req.body;

      if (operationName === 'GetCategories') {
        req.reply({
          data: {
            getCategories: [
              { _id: 'cat-1', name: 'Category A', createdAt: '', updatedAt: '' },
              { _id: 'cat-2', name: 'Category B', createdAt: '', updatedAt: '' },
            ],
          },
        });
      }

      if (operationName === 'DeleteCategory') {
        req.reply({
          data: {
            deleteCategory: { _id: 'cat-1', name: 'Category A' },
          },
        });
      }

      if (operationName === 'UpdateCategory') {
        req.reply({
          data: {
            updateCategory: {
              _id: 'cat-2',
              name: 'Updated Category B',
              updatedAt: new Date().toISOString(),
            },
          },
        });
      }
    }).as('graphql');

    cy.visit('/admin/menu');
    cy.get('[data-testid="tab-manage"]').click();
  });

  it('should render categories, update one, and delete another successfully', () => {
    cy.get('[data-testid="category-row-cat-1"]').should('contain', 'Category A');
    cy.get('[data-testid="category-row-cat-2"]').should('contain', 'Category B');
    cy.get('[data-testid="category-row-cat-2"]').within(() => {
      cy.get('[data-testid="edit-trigger"]').click();
    });

    cy.get('[data-testid="edit-dialog"]').within(() => {
      cy.get('input').clear().type('Updated Category B');
      cy.get('[data-testid="edit-submit"]').click();
    });
    cy.contains('Амжилттай шинэчлэгдлээ!').should('be.visible');
    cy.get('[data-testid="category-row-cat-1"]').within(() => {
      cy.get('[data-testid="category-cat-1-delete-button"]').click();
    });

    cy.get('[data-testid="category-cat-1-dialog"]').within(() => {
      cy.get('[data-testid="delete-submit"]').click();
    });
    cy.contains('Амжилттай устгалаа!').should('be.visible');
  });
});
