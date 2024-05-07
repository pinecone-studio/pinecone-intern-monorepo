
describe('One article page',()=>{
  beforeEach(()=>{
    cy.visit('/articles/663097b58073930529faddfc')
  })
  it('1. it should display',()=>{
    cy.get('[data-cy="one-article-container"]').should('exist').and('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('[data-cy="one-article-back-cutton"]').should('exist').click({force:true})
    cy.get('[data-cy="one-article-content"]').should('exist')
  })
})