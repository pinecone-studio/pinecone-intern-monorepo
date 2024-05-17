describe('file-uploader component', () => {
  beforeEach(() => cy.visit('/create-course'));
  it('Should display file-uploader', () => {
    cy.get('[data-cy="file-uploader-test-id"]').should('exist');
  });
});
