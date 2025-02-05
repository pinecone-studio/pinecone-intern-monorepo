describe('Profile Edit Page', () => {
  beforeEach(() => {
    cy.visit('/settings');
  });

  it('displays all form elements correctly', () => {
    cy.get('[data-testid="edit-profile"]').should('have.text', 'Edit Profile');
    cy.get('input[placeholder="Enter full name"]').should('be.visible');
    cy.get('input[placeholder="Enter username"]').should('be.visible');
    cy.get('textarea[placeholder="Enter bio"]').should('be.visible');
    cy.contains('button', 'Change profile photo').should('be.visible');
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('updates form fields and displays values correctly', () => {
    // Test full name input and display
    cy.get('input[placeholder="Enter full name"]').type('John Doe').should('have.value', 'John Doe');
    cy.contains('p', 'John Doe').should('be.visible');

    // Test username input
    cy.get('input[placeholder="Enter username"]').type('johndoe123').should('have.value', 'johndoe123');

    // Test bio input
    cy.get('textarea[placeholder="Enter bio"]').type('This is my test bio').should('have.value', 'This is my test bio');
    cy.contains('button', 'Select Gender').click(); // Open the dropdown

    // Ensure the 'Female' option is available before clicking

    cy.get('[data-cy="dropdown-select-female"]').click();
    cy.get('[data-cy="save-button"]').click();
  });

  it('handles profile photo button options', () => {
    cy.contains('button', 'Change profile photo').click();

    cy.get('[role="menuitem"]').contains('Upload New Photo').should('be.visible').click();
    cy.contains('button', 'Upload New Photo').should('be.visible');

    cy.contains('button', 'Upload New Photo').click();
    cy.get('[role="menuitem"]').contains('Remove Current Photo').should('be.visible').click();
    cy.contains('button', 'Remove Current Photo').should('be.visible');
  });

  it('submits form successfully', () => {
    // Intercept the GraphQL mutation
    cy.intercept('POST', '**/graphql', {
      body: {
        data: {
          updateInfo: true,
        },
      },
    }).as('updateProfile');

    // Fill out the form
    cy.get('input[placeholder="Enter full name"]').type('John Doe');
    cy.get('input[placeholder="Enter username"]').type('johndoe123');
    cy.get('textarea[placeholder="Enter bio"]').type('Test bio');

    // Select gender with proper waiting
    cy.contains('button', 'Select Gender').click();
    cy.get('[role="menuitem"]').contains('Male').should('be.visible').click();

    // Submit the form
    cy.contains('button', 'Submit').click();

    // Wait for the mutation and verify success
    cy.wait('@updateProfile');
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Profile updated successfully!');
    });
  });

  it('handles form submission errors', () => {
    // Intercept and mock error response
    cy.intercept('POST', '**/graphql', {
      statusCode: 500,
      body: {
        errors: [
          {
            message: 'Update failed',
          },
        ],
      },
    }).as('updateProfileError');

    // Submit form without filling (to test error case)
    cy.contains('button', 'Submit').click();

    // Wait for the mutation and verify error message
    cy.wait('@updateProfileError');
    cy.contains('Failed to update profile. Please try again.').should('be.visible');
  });

  it('shows loading state during submission', () => {
    // Intercept with delay to test loading state
    cy.intercept('POST', '**/graphql', {
      delay: 1000,
      body: {
        data: {
          updateInfo: true,
        },
      },
    }).as('updateProfileDelay');

    // Fill minimal form data and submit
    cy.get('input[placeholder="Enter full name"]').type('John Doe');
    cy.contains('button', 'Submit').click();

    // Verify loading state
    cy.contains('button', 'Saving...').should('be.visible');
    cy.wait('@updateProfileDelay');
    cy.contains('button', 'Submit').should('be.visible');
  });
});
