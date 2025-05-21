describe('FoodForm Modal Functionality', () => {
  beforeEach(() => {
    cy.visit('/admin/food'); 
  });

  it('opens and closes the dialog', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-dialog"]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="food-dialog"]').should('not.exist');
  });

  it('shows warning if form is empty', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please fill out all fields.').should('exist');
  });

  it('uploads image and shows preview', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="image-preview"]').should('exist');
  });

  it('selects category and toggles status', () => {
    cy.get('[data-testid="add-food-button"]').click();

    // Select first category item
    cy.get('[data-testid="category-select"]').click();

    // Wait a bit to let dropdown open
    cy.wait(300); // adjust if necessary depending on animation time

    cy.get('[data-testid^="category-"]').first().click();

    // Verify value selected in trigger
    cy.get('[data-testid="category-select-value"]').should('not.have.text', 'Select category');

    // Toggle status
    cy.get('[data-testid="status-inactive"]').click().should('be.checked');
    cy.get('[data-testid="status-active"]').click().should('be.checked');
  });

  it('submits form with valid data (mocked)', () => {
    // Mock GraphQL mutation response
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddProductInput') {
        req.reply({ data: { addProductInput: { success: true } } });
      }

      if (req.body.operationName === 'getCategories') {
        req.reply({
          data: {
            getCategories: [
              { _id: 'cat1', name: 'Rice' },
              { _id: 'cat2', name: 'Noodle' },
            ],
          },
        });
      }
    }).as('graphql');

    cy.get('[data-testid="add-food-button"]').click();

    cy.get('[data-testid="food-name-input"]').type('Test Food');
    cy.get('[data-testid="price-input"]').type('1200');

    // Select category
    cy.get('[data-testid="category-select"]').click();
    cy.wait(200);
    cy.get('[data-testid="category-cat1"]').click();

    // Upload image
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });

    // Submit
    cy.get('[data-testid="submit-button"]').click();

    // Wait for GraphQL mutation
    cy.wait('@graphql');

    cy.contains('Food item added successfully!').should('exist');
  });
});
