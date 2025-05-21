describe('FoodForm Modal Functionality', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
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
    }).as('getCategories');

    cy.visit('/admin/food');
  });

  it('opens and closes the dialog', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-dialog"]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="food-dialog"]').should('not.exist');
  });

  it('shows warning if form is fully empty', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please fill out all fields.').should('exist');
  });

  it('shows warning if food name is missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="price-input"]').type('1200');
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please fill out all fields.').should('exist');
  });

  it('shows warning if price is missing', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Test Food');
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please fill out all fields.').should('exist');
  });

  it('shows warning if no image is uploaded', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Test Food');
    cy.get('[data-testid="price-input"]').type('1200');
    cy.get('[data-testid="category-select"]').click();
    cy.wait(300);
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please upload an image.').should('exist');
  });

  it('shows warning if non-image file is uploaded', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.txt', { force: true });
    cy.contains('Only image files are allowed.').should('exist');
  });

  it('uploads image and shows preview', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="image-preview"]').should('exist');
  });

  it('selects category and toggles status', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="category-select"]').click();
    cy.wait(300);
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="category-select-value"]').should('not.have.text', 'Select category');
    cy.get('[data-testid="status-inactive"]').click().should('be.checked');
    cy.get('[data-testid="status-active"]').click().should('be.checked');
  });

  it('submits form with valid data (mocked success)', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddProductInput') {
        req.reply({ data: { addProductInput: { success: true } } });
      }
    }).as('addProduct');

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Test Food');
    cy.get('[data-testid="price-input"]').type('1200');
    cy.get('[data-testid="category-select"]').click();
    cy.wait(300);
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@addProduct');
    cy.contains('Food item added successfully!').should('exist');
  });

  it('shows error toast if GraphQL mutation fails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddProductInput') {
        req.reply({ errors: [{ message: 'Mutation failed' }] });
      }
    }).as('failedMutation');

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Fail Case');
    cy.get('[data-testid="price-input"]').type('1000');
    cy.get('[data-testid="category-select"]').click();
    cy.wait(300);
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@failedMutation');
    cy.contains('Something went wrong. Please try again.').should('exist');
  });

  it('shows error toast if image upload fails (simulated)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.window().then((win: any) => {
      cy.stub(win, 'uploadImageToCloudinary').throws(new Error('Upload failed'));
    });

    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'AddProductInput') {
        req.reply({ data: { addProductInput: { success: true } } });
      }
    });

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Upload Fail');
    cy.get('[data-testid="price-input"]').type('900');
    cy.get('[data-testid="category-select"]').click();
    cy.wait(300);
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Something went wrong. Please try again.').should('exist');
  });
});
