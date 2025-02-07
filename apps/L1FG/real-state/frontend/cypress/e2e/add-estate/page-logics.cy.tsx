import 'cypress-file-upload';

describe('Form Logic Handlers', () => {
  beforeEach(() => {
    cy.window().then((window) => {
      const token = Cypress.env('AUTH_TOKEN');
      window.localStorage.setItem('token', token);
    });
    cy.visit('/add-estate');
  });
  it('should handle parameter destructuring and state updates', () => {
    // Test handleCheckboxChange parameters
    cy.get('[data-cy=property-details]').within(() => {
      cy.get('[data-cy=garage]')
        .select('Тийм')
        .then(() => {
          cy.get('[data-cy=garage]').should('have.value', 'true');
        })
        .select('Үгүй')
        .then(() => {
          cy.get('[data-cy=garage]').should('have.value', 'false');
        });
    });

    // Test handleFileChange parameters
    cy.fixture('sample-image.jpg', 'base64').then((fileContent) => {
      cy.get('[data-cy=images-section]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });
  });

  it('should handle upload errors and null responses', () => {
    // Mock upload error response
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      statusCode: 500,
      body: { error: 'Upload failed' },
    }).as('uploadError');

    // Mock GraphQL error
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Error' }] },
    }).as('graphqlError');

    cy.fixture('sample-image.jpg', 'base64').then((fileContent) => {
      cy.get('[data-cy=images-section]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    cy.get('form').submit();

    // Verify both error messages
    cy.wait(['@uploadError', '@graphqlError']);
    cy.contains('Файл хуулахад алдаа гарлаа').should('be.visible');
    cy.contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
  });
  it('should handle upload error', () => {
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      forceNetworkError: true,
    }).as('uploadError');

    cy.fixture('sample-image.jpg', 'base64').then((fileContent) => {
      cy.get('[data-cy=images-section]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    cy.get('form').submit();
    cy.wait('@uploadError').then(() => {
      cy.contains('Файл хуулахад алдаа гарлаа').should('be.visible');
    });
  });

  it('should handle checkbox parameter changes', () => {
    cy.get('[data-cy=property-details]').within(() => {
      cy.get('[data-cy=garage]')
        .select('Тийм')
        .then(() => {
          cy.get('[data-cy=garage]').should('have.value', 'true');
        });
    });
  });

  it('should handle file upload null response', () => {
    cy.intercept('POST', 'https://api.cloudinary.com/v1_1/*/image/upload', {
      statusCode: 200,
      body: { secure_url: null },
    }).as('nullUpload');

    cy.fixture('sample-image.jpg', 'base64').then((fileContent) => {
      cy.get('[data-cy=images-section]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    cy.get('form').submit();
    cy.wait('@nullUpload');
  });

  it('should handle GraphQL mutation error', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'GraphQL Error' }] },
    }).as('graphqlError');

    cy.fixture('sample-image.jpg', 'base64').then((fileContent) => {
      cy.get('[data-cy=images-section]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName: 'sample-image.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    cy.get('form').submit();
    cy.contains('Зар нэмэхэд алдаа гарлаа').should('be.visible');
  });
});
