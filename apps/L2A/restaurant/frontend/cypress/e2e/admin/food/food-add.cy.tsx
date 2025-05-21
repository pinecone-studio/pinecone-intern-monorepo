describe('FoodForm E2E', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('getCategories')) {
        req.reply({
          data: {
            getCategories: [
              { _id: 'cat1', name: 'Rice' },
              { _id: 'cat2', name: 'Noodle' },
            ],
          },
        });
      }

      if (req.body.query.includes('AddProductInput')) {
        req.reply({
          data: {
            addProductInput: {
              success: true,
            },
          },
        });
      }
    }).as('graphql');

    cy.visit('/admin/food');
  });

  it('opens and closes the dialog', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-dialog"]').should('exist');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="food-dialog"]').should('not.exist');
  });

  it('resets form when dialog is closed', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Temp Food');
    cy.get('body').type('{esc}');
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').should('have.value', '');
  });

  it('shows warning if form is fully empty', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please fill out all fields.').should('exist');
  });

  it('shows warning if no image is uploaded', () => {
    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Test Food');
    cy.get('[data-testid="price-input"]').type('1000');
    cy.get('[data-testid="category-select"]').click();
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Please upload an image.').should('exist');
  });

  it('rejects non-image file uploads', () => {
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
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="status-inactive"]').click().should('be.checked');
    cy.get('[data-testid="status-active"]').click().should('be.checked');
  });

  it('submits form with valid data', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.window().then((win: any) => {
      win.__mockUploadImage = () => Promise.resolve('https://mock.com/image.jpg');
    });

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Delicious Food');
    cy.get('[data-testid="price-input"]').type('2000');
    cy.get('[data-testid="category-select"]').click();
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Food item added successfully!').should('exist');
  });

  it('shows error toast if GraphQL mutation fails', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query.includes('AddProductInput')) {
        req.reply({ statusCode: 400, body: { errors: [{ message: 'Mutation failed' }] } });
      }
    }).as('mutationError');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.window().then((win: any) => {
      win.__mockUploadImage = () => Promise.resolve('https://mock.com/image.jpg');
    });

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Fail GraphQL');
    cy.get('[data-testid="price-input"]').type('1111');
    cy.get('[data-testid="category-select"]').click();
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.wait('@mutationError');
    cy.contains('Something went wrong. Please try again.').should('exist');
  });

  it('shows error toast if image upload fails (simulated)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cy.window().then((win: any) => {
      win.__mockUploadImage = () => Promise.reject(new Error('Upload failed'));
    });

    cy.get('[data-testid="add-food-button"]').click();
    cy.get('[data-testid="food-name-input"]').type('Fail Image');
    cy.get('[data-testid="price-input"]').type('1500');
    cy.get('[data-testid="category-select"]').click();
    cy.get('[data-testid="category-cat1"]').click();
    cy.get('[data-testid="image-input"]').selectFile('cypress/fixtures/sample.jpg', { force: true });
    cy.get('[data-testid="submit-button"]').click();
    cy.contains('Something went wrong. Please try again.').should('exist');
  });
});
