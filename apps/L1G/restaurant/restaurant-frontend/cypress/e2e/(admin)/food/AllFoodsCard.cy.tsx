describe('AllFoodsCard', () => {
  it('should render', () => {
    cy.visit('/food');
    cy.get('[data-cy=allfoods]').should('be.visible');
  });
  it('should delete food and show toast success', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'DeleteFood') {
        req.reply({
          statusCode: 200,
          body: {
            data: { deleteFood: { foodId: '1' } },
          },
        });
      }
    }).as('deleteFoodSuccess');
    cy.visit('/food');
    cy.get('[data-cy=delete-dialog-trigger-0]').click();
    cy.get('[data-cy=delete-dialog-delete-button]').click();
    cy.wait('@deleteFoodSuccess');
    cy.contains('Хоол амжилттай устгагдлаа!').should('be.visible');
  });
  it('should show toast error when delete food dails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'DeleteFood') {
        req.reply({
          statusCode: 200,
          body: {
            errors: [{ message: 'Food with ID 1 not found' }],
            data: null,
          },
        });
      }
    }).as('deleteFoodError');
    cy.visit('/food');
    cy.get('[data-cy=delete-dialog-trigger-0]').click().wait(1000);
    cy.get('[data-cy=delete-dialog-delete-button]').click().wait(1000);
    cy.wait('@deleteFoodError');
    cy.get('body').should('contain.text', 'Хоол устгахад алдаа гарлаа!').should('be.visible');
  });
});
