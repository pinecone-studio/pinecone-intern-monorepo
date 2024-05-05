describe ('Handle section page' , () => {
    beforeEach(() => cy.visit('/section'))

    it('1. check back to dashboard page button click ', () => {
        cy.get('[data-testid="handle-back-page"]').should('exist');
        cy.get('[data-testid="handle-back-page"]').click();
    });

    it('2.Should display GetSections component' , () => {
        cy.get('[data-testid="get-sections-query"]').should('exist')
        it('3.should display SEction form component' , () => {
            cy.get('[data-testid="section-form"]').should('exist')
        })
    })

    it('4.Should display AddSection feature' , () => {
        cy.get('[ data-testid="add-section-form"]').should('exist')
    
    it('5. create lesson button', () => {
        cy.get('[data-cy="handle-add-section-btn"]').should('exist').should('be.disabled');
      });
      it('6. check create button be enable and when inputs filled', () => {
        cy.get('[data-testid="title"]').type('html');
        cy.get('[data-testid="description"]').type('html intro');
        cy.get('#file-test').selectFile('public/js.png', { force: true });
        cy.get('[data-testid="handle-add-section-btn"]').should('not.be.disabled');
        cy.get('[data-testid="handle-add-section-btn"]').click();
      });

    })
})
