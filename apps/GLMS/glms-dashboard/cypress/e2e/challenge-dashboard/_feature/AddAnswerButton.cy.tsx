describe('glms-dashboard add input', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('add radio button check', ()=>{
      cy.get('#add-answer').should('be.visible').click(); // Splitting the chain
      cy.get('#answer-test-1').should('exist').type('Hello');
  })

  it('right button check', ()=>{
    cy.get('#radio-button-glms').should('be.visible').click()
    cy.get('#choose-button').click()
    cy.get('#radio-button-glms').should('not.be.visible').click()
    cy.get('#choose-button').click()
    cy.get('#radio-button-glms').should('be.visible').click()
  })
})