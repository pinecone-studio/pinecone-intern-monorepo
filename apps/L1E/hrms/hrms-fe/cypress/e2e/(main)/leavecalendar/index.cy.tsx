
describe('leavecalendarpage',()=>{
    it (`should render leavecalendarpage`,()=>{
      cy.visit(`/leave-calendar`)
      cy.get('[data-cy=leave-calendar-page]').should('be.visible')
      cy.get('[data-cy=request-button]').click()
      cy.get('[data-cy=request-form-page]').should('be.visible')
    })
    it (`should render leavecalendarpage`,()=>{
      cy.visit(`/leave-calendar`)
      cy.get('[data-cy=leave-calendar-page]').should('be.visible')
      cy.get('[data-cy=data-0]').should('be.visible')
      cy.get('[data-cy=matched-data-0]').should('be.visible')
    })
})
