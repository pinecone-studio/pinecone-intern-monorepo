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

  it('uploads a profile photo successfully', () => {
    // "Change profile photo" товчийг дарах
    cy.contains('button', 'Change profile photo').click();

    // "Upload Photo" товчийг дарах
    cy.contains('button', 'Upload Photo').click();

    // Файл сонгох
    cy.get('input[type="file"]').selectFile('cypress/fixtures/testPicture.png', {
      force: true,
      action: 'select',
    });

    // `change` эвэнт үүсгэх (шаардлагатай бол)
    cy.get('input[type="file"]').then(($input) => {
      $input.css('display', 'block');
      $input.css('visibility', 'visible');
      cy.wrap($input).trigger('change');
      cy.intercept('POST', 'https://api.cloudinary.com/v1_1/dqxstnqrf/image/upload', {
        statusCode: 200,
        body: {
          // eslint-disable-next-line no-secrets/no-secrets
          secureurl: 'https://res.cloudinary.com/dqxstnqrf/image/upload/v1234567890/sample.jpg',
        },
      }).as('testPicture'); // `change` эвэнт үүсгэх
    });
  });

  it('updates form fields and displays values correctly', () => {
    cy.get('input[placeholder="Enter full name"]').type('John Doe').should('have.value', 'John Doe');
    cy.contains('p', 'John Doe').should('be.visible');

    cy.get('input[placeholder="Enter username"]').type('johndoe123').should('have.value', 'johndoe123');
    cy.get('textarea[placeholder="Enter bio"]').type('This is my test bio').should('have.value', 'This is my test bio');

    cy.contains('button', 'Select Gender').click();
    cy.get('[data-cy="dropdown-select-female"]').click();
    cy.get('[data-cy="save-button"]').click();
  });

  it('submits form successfully', () => {
    cy.intercept('POST', '**/graphql', {
      body: { data: { updateInfo: true } },
    }).as('updateProfile');

    cy.get('input[placeholder="Enter full name"]').type('John Doe');
    cy.get('input[placeholder="Enter username"]').type('johndoe123');
    cy.get('textarea[placeholder="Enter bio"]').type('Test bio');

    cy.contains('button', 'Select Gender').click();
    cy.get('[role="menuitem"]').contains('Male').should('be.visible').click();

    cy.contains('button', 'Submit').click();

    cy.wait('@updateProfile');
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Profile updated successfully!');
    });
  });

  it('handles form submission errors', () => {
    cy.intercept('POST', '**/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Update failed' }] },
    }).as('updateProfileError');

    cy.contains('button', 'Submit').click();
    cy.wait('@updateProfileError');
    cy.contains('Failed to update profile. Please try again.').should('be.visible');
  });

  // it('shows loading state during submission', () => {
  //   cy.intercept('POST', '**/graphql', {
  //     delay: 1000,
  //     body: { data: { updateInfo: true } },
  //   }).as('updateProfileDelay');

  //   cy.get('input[placeholder="Enter full name"]').type('John Doe');
  //   cy.contains('button', 'Submit').click();

  //   cy.contains('button', 'Saving...').should('be.visible');
  //   cy.wait('@updateProfileDelay');
  //   cy.contains('button', 'Submit').should('be.visible');
  // });
});
