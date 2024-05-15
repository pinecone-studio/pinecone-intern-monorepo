describe('Handle section page', () => {
  beforeEach(() => cy.visit('/section'));
  describe('Getsection page', () => {
    it('1.Should display GetSections component', () => {
      cy.visit('/6633305c94d4584898bb049a');
      cy.get('[data-cy="lesson-test-id"]').should('exist').eq(0).click();
      cy.window().its('localStorage').invoke('getItem', 'lessonID');
      cy.url().should('include', '/section');
      cy.get('[data-testid="get-section-form"]').should('exist');
      cy.get('[data-cy="title"]').should('exist');
      cy.get('[data-cy="description"]').should('exist');
      cy.get('[data-cy="contentImage"]').should('exist');
      cy.get('[data-cy="update-btn"]').should('exist').eq(1).click();
      cy.url().should('include', '/update-section');
      cy.visit('/section');
    });
  });
  it('2. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('3.Should display AddSection feature', () => {
    cy.get('[data-testid="add-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist').type('html');
    cy.get('[data-cy="description"]').should('exist').type('html intro');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').click({ multiple: true });
  });

  it('4.When section created successfully AddSection form reset', () => {
    cy.get('[data-testid="add-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist');
    cy.get('[data-cy="description"]').should('exist');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').should('exist').should('be.disabled');
  });
});
