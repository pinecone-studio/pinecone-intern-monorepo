describe('Student Page', () => {
  beforeEach(() => {
    cy.visit('/student');
  });

  it('Should render content within the container', () => {
    cy.get('.container').should('exist');
    cy.get('.container').children().should('exist');
  });

  it('Should have correct container class', () => {
    cy.get('.container').should('have.class', 'mx-auto');
  });
});
