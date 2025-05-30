describe('Upload to Cloudinary', () => {
  it('uploads a file and shows the returned URL', () => {
    cy.intercept('POST', 'https://api.cloudinary.com/**', {
      statusCode: 200,
      body: {
        // eslint-disable-next-line @typescript-eslint/naming-convention 
        // eslint-disable-next-line camelcase
        secure_url: 'https://cloudinary.com/fake.png',
      },
    }).as('upload');

    cy.visit('/test-upload');
    cy.get('[data-cy=file-input]').selectFile('cypress/fixtures/test-image.png', { force: true });
    cy.wait('@upload');
    cy.get('[data-cy=url-list]').should('contain', 'https://cloudinary.com/fake.png');
  });
});
