describe('FoodUpdateDialog', () => {
  it('should render', () => {
    cy.visit('/food');
    cy.get('[data-cy=allfoods]').should('be.visible');
  });
  it('should update food and show toast success', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateFood') {
        req.reply({
          statusCode: 200,
          body: {
            data: { updateFood: { foodId: '1' } },
          },
        });
      }
    }).as('updateFoodSuccess');
    cy.visit('/food');
    cy.get('[data-cy=allfoods-food-0]').find('[data-cy=food-update-dialog-open]').click();
    cy.get('[data-cy=food-update-foodName-input]').clear();
    cy.get('[data-cy=food-update-foodName-input]').type('Tested');
    cy.get('[data-cy=food-update-submit-button]').click();
    cy.wait('@updateFoodSuccess');
    cy.contains('Хоол амжилттай шинэчлэгдлээ!').should('be.visible');
  });
  it('should show toast error when update food fails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'UpdateFood') {
        req.reply({
          statusCode: 200,
          body: {
            data: null,
            errors: [{ message: 'Food with ID 1 not found' }],
          },
        });
      }
    }).as('updateFoodError');
    cy.visit('/food');
    cy.get('[data-cy=allfoods-food-0]').find('[data-cy=food-update-dialog-open]').click();
    cy.get('[data-cy=food-update-foodName-input]').clear();
    cy.get('[data-cy=food-update-foodName-input]').type('Tested');
    cy.get('[data-cy=food-update-submit-button]').click();
    cy.wait('@updateFoodError');
    cy.get('body').should('contain.text', 'Хоол шинэчлэхэд алдаа гарлаа!').should('be.visible');
  });
});
