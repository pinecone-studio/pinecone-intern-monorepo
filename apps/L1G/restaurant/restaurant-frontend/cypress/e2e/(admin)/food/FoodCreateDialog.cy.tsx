describe('FoodCreateDialog', () => {
  it('should display an error message if food values are not provided', () => {
    cy.visit('/food');
    cy.get('[data-cy=create-food-dialog-open]').click();
    cy.get('[data-cy=create-food-submit-button]').click();
    cy.get('[data-cy=food-foodName-error-message]').should('have.text', 'Хоолны нэр оруулна уу!');
    cy.get('[data-cy=create-food-image-error-message]').should('have.text', 'Зураг оруулна уу!');
    cy.get('[data-cy=food-price-error-message]').should('have.text', 'Үнэ оруулна уу!');
  });

  it('should create new food and show toast success', () => {
    cy.visit('/food');
    cy.get('[data-cy=create-food-dialog-open]').click();
    cy.get('[data-cy=create-food-foodName-input]').type('Test');
    cy.get('[data-cy=create-food-image-input]').selectFile('cypress/fixtures/foodimage.png');
    cy.get('[data-cy=create-food-price-input]').type('20000');
    cy.get('[data-cy=create-food-submit-button]').click();
    cy.contains('Хоол амжилттай үүслээ!').should('be.visible');
  });

  it('should show toast error whe create food fails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'CreateFood') {
        req.reply({
          statusCode: 200,
          body: {
            data: null,
            errors: [{ message: 'Failed to create food' }],
          },
        });
      }
    }).as('createFoodError');
    cy.visit('/food');
    cy.get('[data-cy=create-food-dialog-open]').click();
    cy.get('[data-cy=create-food-foodName-input]').type('Test2');
    cy.get('[data-cy=create-food-image-input]').selectFile('cypress/fixtures/foodimage.png');
    cy.get('[data-cy=create-food-price-input]').type('15000');
    cy.get('[data-cy=create-food-submit-button]').click();
    cy.wait('@createFoodError');
    cy.get('body').should('contain.text', 'Хоол үүсгэхэд алдаа гарлаа!').should('be.visible');
  });
});
