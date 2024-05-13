describe ('Handle update-course page' , () => {
    beforeEach(() => cy.visit('/update-course'))

    it('1. Update section page' , () => {
      cy.get('[data-testid="update-course-container"]').should('exist')
    })

    it('2. check back to dashboard page button click ', () => {
      cy.get('[data-cy="handle-back-page"]').should('exist');
      cy.get('[data-cy="handle-back-page"]').click();
    });

    it('3.Should display update section container', () => {
      cy.get('[data-testid="update-course-form"]').should('exist');
      cy.get('[data-cy="title"]').should('exist').type('Html')
      cy.get('[data-cy="description"]').should('exist').type('Html intro')
      cy.get('#file-test').selectFile('public/js.png', { force: true });
      cy.get('[data-cy="update-button"]').should('exist')
    });
})
