const fileName = 'test.png';
const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';
const base64Data = base64Image.split(',')[1];
const byteArray = Uint8Array.from(Buffer.from(base64Data, 'base64'));
const blob = new Blob([byteArray], { type: 'image/jpeg' });
const testFile = new File([blob], fileName, { type: 'image/jpeg' });

function fillProfileForm() {
  cy.get('[data-cy="input-name"]').type('John Doe');
  cy.get('[data-cy="input-bio"]').type('I love coding');
  cy.get('[data-cy="input-interest"]').type('Technology');
  cy.get('[data-cy="input-profession"]').type('Engineer');
  cy.get('[data-cy="input-school"]').type('MIT');
  cy.get('[data-cy="next-button"]').click();
}

function uploadFileMultipleTimes(times: number) {
  for (let i = 0; i < times; i++) {
    cy.get('input[type="file"]').selectFile(
      { contents: testFile, fileName, lastModified: Date.now() },
      { force: true }
    );
  }
}

describe('Create Account', () => {
  beforeEach(() => {
    cy.window().then(win => {
      win.localStorage.setItem('token', 'fake-jwt-token');
    });

    cy.intercept('POST', '/api/graphql', (req) => {
      if (req.body.operationName === 'GetCurrentUser') {
        req.reply({
          data: {
            getCurrentUser: {
              _id: 'mock-user-id',
              email: 'test@example.com',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              verficationCode: '',
              __typename: 'User',
              isVerified: true,
            },
          },
        });
      }
      if (req.body.operationName === 'CreateProfile') {
        req.reply({
          data: {
            createProfile: {
              id: 'mock-id',
              status: 'SUCCESS',
            },
          },
        });
      }
    });

    cy.visit('/auth/create-account');
    cy.contains('Next').click();
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();

    cy.contains('Back').click();
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();

    cy.contains('Next').click();
    cy.contains('Pick a date').click();
    cy.wait(500);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();
  });

  it('5. Should show validation errors when fields are empty', () => {
    cy.contains('Back').click();
    cy.contains('Pick a date').click();
    cy.wait(500);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();

    cy.get('[data-cy="next-button"]').click();
    fillProfileForm();

    cy.contains('Next').click();
    cy.contains('Please select a photo to upload.').should('exist');
    cy.get('[data-cy="step-button"]').click({ force: true });

    cy.get('[data-cy="next-button"]').click();
    fillProfileForm();

    uploadFileMultipleTimes(1);
    cy.get('img').should('have.length.at.least', 1);
    cy.get('[data-cy="deleteImage"]').first().click();

    uploadFileMultipleTimes(6); 
    cy.contains('Next').click();
    cy.contains('Youre all set!').should('exist');
  });
});
