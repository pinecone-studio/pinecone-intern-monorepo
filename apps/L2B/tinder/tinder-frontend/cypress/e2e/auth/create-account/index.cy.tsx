const fileName = 'test.png';
const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...';
const base64Data = base64Image.split(',')[1];
const byteArray = Uint8Array.from(Buffer.from(base64Data, 'base64'));
const blob = new Blob([byteArray], { type: 'image/jpeg' });
const testFile = new File([blob], fileName, { type: 'image/jpeg' });
 
describe('Create Account - Third Step (Your Details)', () => {
  beforeEach(() => {
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
    cy.get('[data-cy="input-name"]').type('John Doe');
    cy.get('[data-cy="input-bio"]').type('I love coding');
    cy.get('[data-cy="input-interest"]').type('Technology');
    cy.get('[data-cy="input-profession"]').type('Engineer');
    cy.get('[data-cy="input-school"]').type('MIT');
    cy.get('[data-cy="next-button"]').should('be.visible').and('not.be.disabled').click();

    // step 4
    cy.contains('Next').click();
    cy.contains('Please select a photo to upload.').should('exist')
    cy.get('[data-cy="step-button"]').click({ force: true });
    cy.get('[data-cy="next-button"]').click();
    cy.get('[data-cy="input-name"]').type('John Doe');
    cy.get('[data-cy="input-bio"]').type('I love coding');
    cy.get('[data-cy="input-interest"]').type('Technology');
    cy.get('[data-cy="input-profession"]').type('Engineer');
    cy.get('[data-cy="input-school"]').type('MIT');
    cy.get('[data-cy="next-button"]').should('be.visible').and('not.be.disabled').click();

    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('img').should('have.length.at.least', 1);
    cy.get('[data-cy="deleteImage"]').first().click();
   
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
      { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
        { force: true }
    );
    cy.get('input[type="file"]').selectFile(
      {
        contents: testFile,
        fileName,
        lastModified: Date.now(),
      },
        { force: true }
    );
 
    cy.contains('Next').click();
    cy.contains('Youre all set!').should('exist');
    cy.get('[data-cy="next-button"]').click();
  });
});
