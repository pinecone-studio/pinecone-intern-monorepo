const fileName = 'test.png';
const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...'; // Use real short base64 string
const byteArray = Uint8Array.from(Buffer.from(base64Image, 'base64'));
const blob = new Blob([byteArray], { type: 'image/png' });
const testFile = new File([blob], fileName, { type: 'image/png' });

const interceptGraphQL = () => {
  cy.intercept('POST', '/api/graphql', (req) => {
    const op = req.body.operationName;

    if (op === 'GetCurrentUser') {
      req.reply({
        data: {
          getCurrentUser: {
            _id: 'mock-user-id',
            email: 'user@example.com',
            isVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            __typename: 'User',
          },
        },
      });
    }

    if (op === 'CreateProfile') {
      req.reply({
        data: {
          createProfile: {
            id: 'mock-profile-id',
            status: 'SUCCESS',
          },
        },
      });
    }
  }).as('graphql');
};

const goToStep = (step: number) => {
  cy.visit('/auth/create-account');
  cy.wait('@graphql');

  if (step >= 1) {
    cy.contains('Next').click();
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();
  }

  if (step >= 2) {
    cy.contains('Pick a date').click();
    cy.wait(200);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();
  }

  if (step >= 3) {
    cy.get('[data-cy="input-name"]').type('John');
    cy.get('[data-cy="input-bio"]').type('Bio');
    cy.get('[data-cy="input-interest"]').type('Interest');
    cy.get('[data-cy="input-profession"]').type('Dev');
    cy.get('[data-cy="input-school"]').type('MIT');
    cy.get('[data-cy="next-button"]').click();
  }
};
const uploadImages = (count = 1) => {
  for (let i = 0; i < count; i++) {
    cy.get('input[type="file"]').selectFile(
      { contents: testFile, fileName, lastModified: Date.now() },
      { force: true }
    );
  }
};

describe('Create Account Flow', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'mock-token');
    interceptGraphQL();
  });

  it('completes successfully', () => {
    goToStep(3);
    cy.contains('Upload your image').should('exist');
// cy.get('input[type="file"]').should('exist');
    uploadImages();
    cy.get('[data-cy="step-button"]').contains('Next').click();
    cy.contains("Youre all set!").should('exist');
  });

  it('shows login required error if no user', () => {
    localStorage.removeItem('token');

    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetCurrentUser') {
        req.reply({ data: { getCurrentUser: null } });
      }
    });

    cy.visit('/auth/create-account');
    cy.contains('You must be logged in to create profile.').should('exist');
  });

  it('goes back to Step 1 from Step 2', () => {
    goToStep(1);
    cy.get('[data-cy="2step-back-button"]').click();
    cy.contains('Select').should('exist');
  });

  it('shows error if no date in Step 2', () => {
    goToStep(1);
    cy.contains('Next').click();
    cy.contains('Please select your date of birth.').should('exist');
  });

  it('goes back to Step 2 from Step 3', () => {
    goToStep(2);
    cy.get('[data-cy="input-name"]').should('exist');
    cy.contains('Back').click();
    cy.contains('Pick a date').should('exist');
  });

  it('goes back to Step 3 from upload step', () => {
    goToStep(3);
    cy.get('[data-cy="back-button"]').contains('Back').click();
    cy.contains('Your Details').should('exist');
  });

  it('shows validation errors when Step 3 fields are empty', () => {
    goToStep(2);
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-testid="validation-error"]').should('have.length.at.least', 1);
  });

  it('shows an error if no image is selected and Next is clicked', () => {
  goToStep(3);
  cy.get('[data-cy="step-button"]').click();

  cy.get('[data-cy="imageError"]', { timeout: 1000 })
    .should('be.visible')
    .and('contain.text', 'Please select a photo to upload.');
});

it('should delete an uploaded image when delete button is clicked', () => {
  goToStep(3);
  uploadImages(1);

  cy.get('[data-cy="preview-image"]').should('exist');
  cy.get('[data-cy="deleteImage"]').click();
  cy.get('[data-cy="preview-image"]').should('not.exist');
});

it('shows alert when image upload fails', () => {
  cy.on('window:alert', (txt) => {expect(txt).to.contain('Failed to upload sample.jpg');});
  goToStep(3);
  cy.intercept('POST', 'https://api.cloudinary.com/v1_1/**', {statusCode: 500,body: { error: 'Simulated upload failure' },}).as('failedUpload');
  uploadImages(1);
  cy.get('[data-cy="step-button"]').click();
  cy.wait('@failedUpload');
});
});