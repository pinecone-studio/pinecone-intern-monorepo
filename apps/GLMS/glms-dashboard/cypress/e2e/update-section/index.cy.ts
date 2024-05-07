describe ('Handle update-section page' , () => {
    beforeEach(() => cy.visit('/update-section'))

    it('1. check back to section page button click ', () => {
        cy.get('[data-testid="handle-back-page"]').should('exist');
        cy.get('[data-testid="handle-back-page"]').click();
    });

    it('3.Should display AddSection feature' , () => {
        cy.get('[ data-testid="add-section-form"]').should('exist')
    
    it('5. update section button', () => {
        cy.get('[data-cy="handle-add-section-btn"]').should('exist').should('be.disabled');
      });
      it('6. check update button be enable and when inputs filled', () => {
        cy.get('[data-testid="title"]').type('html');
        cy.get('[data-testid="description"]').type('html intro');
        cy.get('#file-test').selectFile('public/js.png', { force: true });
        cy.get('[data-testid="handle-add-section-btn"]').should('be.visible');
        cy.get('[data-testid="handle-add-section-btn"]').click();
      });

    });
})
