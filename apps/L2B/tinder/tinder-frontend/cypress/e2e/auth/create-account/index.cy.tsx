const fileName = 'test.png';
const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // Replace with full base64 if needed
const base64Data = base64Image.split(',')[1];
const byteArray = Uint8Array.from(Buffer.from(base64Data, 'base64'));
const blob = new Blob([byteArray], { type: 'image/jpeg' });
const testFile = new File([blob], fileName, { type: 'image/jpeg' });

describe('Create Account', () => {
  beforeEach(() => {
    // ✅ Simulate logged-in user by setting token
    localStorage.setItem('token', 'mock-jwt-token');

    // ✅ Intercept and mock GraphQL requests
    cy.intercept('POST', '/api/graphql', (req) => {
      const op = req.body.operationName;

      if (op === 'GetCurrentUser') {
        req.reply({
          data: {
            getCurrentUser: {
              _id: 'mock-user-id',
              email: 'john@example.com',
              verficationCode: '123456',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              __typename: 'User',
              isVerified: true,
            },
          },
        });
      }

      if (op === 'FetchProfile') {
        req.reply({
          data: {
            fetchProfile: {
              id: 'mock-profile-id',
              name: 'John Doe',
              __typename: 'Profile',
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
    });
  });

  it('Should complete the account creation flow', () => {
    cy.visit('/auth/create-account');

 
    cy.contains('Next').click();
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();

    
    cy.contains('Pick a date').click();
    cy.wait(500);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();

    
    cy.get('[data-cy="input-name"]').type('John Doe');
    cy.get('[data-cy="input-bio"]').type('I love coding');
    cy.get('[data-cy="input-interest"]').type('Technology');
    cy.get('[data-cy="input-profession"]').type('Engineer');
    cy.get('[data-cy="input-school"]').type('MIT');
    cy.get('[data-cy="next-button"]').should('be.visible').and('not.be.disabled').click();

   
    cy.contains('Next').click();
    cy.contains('Please select a photo to upload.').should('exist');

    
    for (let i = 0; i < 7; i++) {
      cy.get('input[type="file"]').selectFile(
        {
          contents: testFile,
          fileName,
          lastModified: Date.now(),
        },
        { force: true }
      );
    }

    cy.get('img').should('have.length.at.least', 1);
    cy.get('[data-cy="deleteImage"]').first().click();

    
    cy.contains('Next').click();
    cy.contains("Youre all set!").should('exist');
  });

  it('Should show validation errors when Step 3 fields are empty', () => {
    cy.visit('/auth/create-account');

    
    cy.contains('Next').click();
    cy.contains('Select').click();
    cy.get('[data-testid="gender-male"]').click();
    cy.contains('Next').click();

    
    cy.contains('Pick a date').click();
    cy.wait(500);
    cy.get('button[name="day"]').eq(1).click();
    cy.contains('Next').click();

    cy.get('[data-cy="next-button"]').click();

    cy.get('[data-testid="validation-error"]').should('have.length.at.least', 1);
  });
});
