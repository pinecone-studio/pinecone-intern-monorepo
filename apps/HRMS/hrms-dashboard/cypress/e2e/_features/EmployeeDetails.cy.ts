describe('EmployeeDetails Component', () => {
  beforeEach(() => {
    // Mock the GraphQL queries and mutations
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetEmployees') {
        req.reply({
          data: {
            getEmployees: [
              {
                id: '1',
                firstname: 'John',
                lastname: 'Doe',
                email: 'john@example.com',
                imageURL: 'https://example.com/image.jpg',
                department: 'SOFTWARE',
                jobTitle: ['Developer'],
                ladderLevel: 'Senior',
                salary: '100000',
                dateOfEmployment: '2023-01-01',
                employmentStatus: 'FULL_TIME',
              },
            ],
          },
        });
      }
      if (req.body.operationName === 'CreateEmployee') {
        req.reply({ data: { createEmployee: { id: '2' } } });
      }
    });

    cy.visit('/employee-details');
  });

  it('renders the component correctly', () => {
    cy.get('h1').should('contain', 'Ажилчид');
    cy.get('[data-testid="add-employee"]').should('exist');
    cy.get('[data-testid="table-demo"]').should('exist');
    cy.get('[data-testid="pagination"]').should('exist');
  });

  it('opens the AddModal when clicking the add button', () => {
    cy.get('[data-testid="add-employee"] button').click();
    cy.get('[data-testid="add-modal"]').should('be.visible');
  });

  it('goes through all steps of the form', () => {
    cy.get('[data-testid="add-employee"] button').click();

    // Step 1: Personal Information
    cy.get('input[name="lastname"]').type('Smith');
    cy.get('input[name="firstname"]').type('Jane');
    cy.get('input[name="email"]').type('jane.smith@example.com');
    cy.get('button').contains('Дараах').click();

    // Step 2: Job Information
    cy.get('[cy-testid="select-one"]');
    cy.get('input[name="jobTitle"]').type('Senior Developer');
    cy.get('input[name="salary"]').type('120000');
    cy.get('button').contains('Дараах').click();

    // Step 3: Additional Information
    cy.get('input[name="ladderLevel"]').type('Senior');
  });

  it('validates form fields', () => {
    cy.get('[data-testid="add-employee"] button').click();

    // Try to proceed without filling required fields
    cy.get('button').contains('Дараах').click();

    // // Fill in invalid email
    // cy.get('input[name="email"]').type('invalid-email');
    // cy.get('.error-message').should('contain', 'Invalid email');

    // Correct the email and proceed
    cy.get('input[name="email"]').clear();
    cy.get('input[name="email"]').type('valid@email.com');
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="firstname"]').type('John');
    cy.get('button').contains('Дараах').click();

    // Validation on job information
  });

  it('handles image upload', () => {
    cy.get('[data-testid="add-employee"] button').click();

    // Mock the Cloudinary API response
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/dy39wvdh0/auto/upload', {
      statusCode: 200,
      body: { url: 'https://res.cloudinary.com/dy39wvdh0/image/upload/test-image.jpg' },
    }).as('cloudinaryUpload');

    // Check if the image URL is set
  });

  it('submits the form successfully', () => {
    cy.get('[data-testid="add-employee"] button').click();

    // Fill in all required fields
    cy.get('input[name="lastname"]').type('Doe');
    cy.get('input[name="firstname"]').type('Jane');
    cy.get('input[name="email"]').type('jane.doe@example.com');
    cy.get('button').contains('Дараах').click();

    cy.get('input[name="jobTitle"]').type('Developer');
    cy.get('input[name="salary"]').type('90000');
    cy.get('button').contains('Дараах').click();

    // Submit the form
    cy.get('button').contains('Илгээх').click();

    // Check if the mutation was called and the table was updated
  });
});
