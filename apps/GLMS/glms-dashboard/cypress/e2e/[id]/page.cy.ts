describe(' course Id page should visit [id]', () => {
  beforeEach(() => {
    cy.visit(`/6633305c94d4584898bb049a`);
  });
  it('should display courseid page', () => {
    cy.get('[data-cy="idCourse"]').should('exist');
    cy.contains('Loading...').should('not.exist');
    cy.contains('Error:').should('not.exist');
  });
});
