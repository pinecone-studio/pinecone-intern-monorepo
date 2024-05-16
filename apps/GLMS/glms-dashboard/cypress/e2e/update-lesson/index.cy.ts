describe('Handle update-lesson page', () => {
  beforeEach(() => cy.visit('/update-lesson'));

  it('1. Update lesson page', () => {
    cy.get('[data-testid="update-lesson-container"]').should('exist');
  });

  it('2. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
  });

  it('3.Should display update lesson container', () => {
    cy.get('[data-testid="update-lesson-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist').type('Java');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="update-button"]').should('exist');
  });
});
