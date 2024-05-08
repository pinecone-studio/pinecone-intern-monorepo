describe('Handle section page', () => {
  beforeEach(() => cy.visit('/section'));

  it('1. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
  });

  it('2.Should display GetSections component', () => {
    cy.get('[data-testid="get-sections-container"]').should('exist');
    cy.get('[data-testid="get-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist');
    cy.get('[data-cy="description"]').should('exist');
    cy.get('[data-cy="contentImage"]').should('exist');
    cy.get('[data-cy="delete-btn"]').should('exist')
    cy.get('[data-cy="delete-btn"]').click()
    cy.get('[data-cy="update-btn"]').should('exist')
    cy.get('[data-cy="update-btn"]').click()
  });

  it('3.Should display AddSection feature', () => {
    cy.get('[data-testid="add-section-form"]').should('exist');
    cy.get('input[name="title"]').type('html');
    cy.get('input[name="description"]').type('html intro');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').click();
  });

  it('4.When section created successfully AddSection form reset' , () => {
    cy.get('[ data-testid="add-section-form"]').should('exist');
    cy.get('input[name="title"]').should('exist');
    cy.get('input[name="description"]').should('exist');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').should('exist').should('be.disabled');
  })
});