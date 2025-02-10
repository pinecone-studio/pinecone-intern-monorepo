describe('Property Details Form', () => {
  beforeEach(() => {
    cy.visit('/add-estate');
  });

  it('should toggle a checkbox and update form state', () => {
    cy.get('[data-cy="garage"]').select('true').should('have.value', 'true');
    cy.get('[data-cy="garage"]').select('false').should('have.value', 'false');

    const filePath = 'cypress/fixtures/sample-image.jpg';

    cy.get('input[type="file"]').selectFile(filePath, { force: true });

    cy.get('input[type="file"]').then(($input) => {
      const files = ($input[0] as HTMLInputElement).files;
      if (files) {
        expect(files).to.have.length(1);
        expect(files[0].name).to.eq('sample-image.jpg');
      } else {
        throw new Error('File upload failed, no files found.');
      }
    });

    // Checkboxes
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
    cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked');

    // File upload
    const filePaths = 'cypress/fixtures/sample-image.jpg';
    cy.get('input[type="file"]').selectFile(filePaths, { force: true });

    // Text Input
    cy.get('[data-cy="title"]').type('Test Property').should('have.value', 'Test Property');
    cy.get('[data-cy="price"]').type('1000000').should('have.value', '1000000');
  });
});
