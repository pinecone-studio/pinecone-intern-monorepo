describe ('Handle update-section page' , () => {
    beforeEach(() => cy.visit('/update-section'))

    it('1. Update section page' , () => {
      cy.get('[data-testid="update-section-page-container"]').should('exist')
    })

    it('2. check back to dashboard page button click ', () => {
      cy.get('[data-cy="handle-back-page"]').should('exist').click();
      cy.url().should('include', '/section');
    });

    it('3.Should display update section container', () => {
      cy.get('[data-testid="update-section-form"]').should('exist');
      cy.get('[data-cy="title"]').should('exist')
      cy.get('[data-cy="description"]').should('exist')
      cy.get('#file-test').selectFile('public/js.png', { force: true });
      cy.get('[data-cy="update-section-handle-btn"]').should('exist')
    });
    it('4.Should display the process of update section', () => {
      cy.get('[data-testid="update-section-form"]').should('exist');
      cy.get('[data-cy="title"]').type('HTML basic')
      cy.get('[data-cy="description"]').type( 'HTML basic description')
      cy.get('#file-test').selectFile('public/js.png', { force: true });
      cy.get('[data-cy="update-section-handle-btn"]').click()
      cy.url().should('include', '/section');
    });
})
