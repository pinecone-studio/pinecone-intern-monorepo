describe('[id]', ()=>{
    beforeEach(()=>{
        cy.visit(`/6630947579f907760d17b9c7`)
    })
    it('should display courseid page' , ()=>{
       cy.get('[data-cy="idCourse"]').should('exist');
       cy.contains('Loading...').should('not.exist');
    cy.contains('Error:').should('not.exist');
    })
})