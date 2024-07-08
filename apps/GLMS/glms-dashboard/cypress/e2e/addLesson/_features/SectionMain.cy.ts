/* eslint-disable max-lines */
/* eslint-disable no-secrets/no-secrets */
describe('SectionMain Component', () => {
  interface UploadSuccessResponse {
    url: string;
  }

  interface UploadErrorResponse {
    error: string;
  }

  const CLOUD_NAME = 'dbtqkhmu5';

  const mockFileUpload = (statusCode: number, body: UploadSuccessResponse | UploadErrorResponse) => {
    cy.intercept('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
      statusCode,
      body,
    }).as('fileUpload');
  };

  beforeEach(() => {
    cy.visit('/addLesson/475e4247-4ac0-4115-a7f2-18c638ca47b9');
  });

  const generateResponse = (state: string) => {
    switch (state) {
      case 'error':
        return { data: {}, errors: [{ message: 'Failed to create lesson' }] };
      default:
        return {};
    }
  };

  const interceptGraphQL = (state: string) => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'CreateLesson') {
        const response = generateResponse(state);
        req.reply(response);
      }
    }).as('error');
  };

  it('should display the form elements correctly', () => {
    cy.get('[data-testid="lesson-title"]').should('exist');
    cy.get('[data-testid="lesson-content"]').should('exist');
    cy.get('[data-testid="lesson-upload-photo"]').should('exist');
    cy.get('[data-testid="save-button"]').should('exist');
  });

  it('should create lesson successfully', () => {
    mockFileUpload(200, { url: 'http://res.cloudinary.com/dbtqkhmu5/image/upload/v1720157310/o79bdtuxdc4m6fgbzzos.jpg' });

    cy.get('[data-testid="lesson-title"]').type('Sample Title');
    cy.get('[data-testid="lesson-content"]').type('Sample Content');

    const fileName = 'sample-image.jpg';
    const fileContent = 'sample image content';
    cy.get('[data-testid="lesson-upload-photo"] input[type="file"]').selectFile({
      contents: Cypress.Buffer.from(fileContent),
      fileName: fileName,
      mimeType: 'image/jpeg',
    });

    cy.wait('@fileUpload');

    cy.get('[data-testid="save-button"] button').click();

    cy.url().should('include', '/addLesson/475e4247-4ac0-4115-a7f2-18c638ca47b9');
    cy.get('[data-testid="course-title"]').should('be.visible').and('contain', 'HTML');
  });

  it('should disable the save button if title and content are empty', () => {
    cy.get('[data-testid="save-button"] button').should('be.disabled');
  });

  it('should enable the save button if title and content are filled', () => {
    cy.get('[data-testid="lesson-title"]').type('Sample Title');
    cy.get('[data-testid="lesson-content"]').type('Sample Content');
    cy.get('[data-testid="save-button"] button').should('not.be.disabled');
  });

  it('should mock file upload and display the image URL', () => {
    mockFileUpload(200, { url: 'http://res.cloudinary.com/dbtqkhmu5/image/upload/v1720157310/o79bdtuxdc4m6fgbzzos.jpg' });

    cy.get('[data-testid="lesson-title"]').type('Sample Title');
    cy.get('[data-testid="lesson-content"]').type('Sample Content');

    const fileName = 'sample-image.jpg';
    const fileContent = 'sample image content'; // Dummy content
    cy.get('[data-testid="lesson-upload-photo"] input[type="file"]').selectFile({
      contents: Cypress.Buffer.from(fileContent),
      fileName: fileName,
      mimeType: 'image/jpeg',
    });

    cy.wait('@fileUpload');

    cy.get('[data-testid="lesson-uploaded-photo"]').should('be.visible');
  });

  it('should display error message when file upload fails', () => {
    mockFileUpload(500, { error: 'Internal Server Error' });

    cy.get('[data-testid="lesson-title"]').type('Sample Title');
    cy.get('[data-testid="lesson-content"]').type('Sample Content');

    const fileName = 'sample-image.jpg';
    const fileContent = 'sample image content';
    cy.get('[data-testid="lesson-upload-photo"] input[type="file"]').selectFile({
      contents: Cypress.Buffer.from(fileContent),
      fileName: fileName,
      mimeType: 'image/jpeg',
    });

    cy.wait('@fileUpload');

    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Error uploading image. Please try again.');
  });

  it('should display error message on mutation failure', () => {
    interceptGraphQL('error');
    mockFileUpload(200, { url: 'http://res.cloudinary.com/dbtqkhmu5/image/upload/v1720157310/o79bdtuxdc4m6fgbzzos.jpg' });

    cy.get('[data-testid="lesson-title"]').type('Sample Title');
    cy.get('[data-testid="lesson-content"]').type('Sample Content');

    // Upload image
    const fileName = 'sample-image.jpg';
    const fileContent = 'sample image content';
    cy.get('[data-testid="lesson-upload-photo"] input[type="file"]').selectFile({
      contents: Cypress.Buffer.from(fileContent),
      fileName: fileName,
      mimeType: 'image/jpeg',
    });

    cy.get('[data-testid="save-button"] button').click();

    cy.wait('@error', { timeout: 10000 });

    cy.get('[data-testid="error-message"]').should('be.visible').and('contain', 'Failed to create lesson');
  });
});
