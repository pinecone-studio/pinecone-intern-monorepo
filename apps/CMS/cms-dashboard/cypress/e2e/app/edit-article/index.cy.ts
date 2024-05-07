describe('edit-article page', () => {
  beforeEach(() => cy.visit('/articles/edit-article/661c87fd6837efa536464d24'));

  it('1. Edit article must be defined', () => {
    cy.get('[data-cy="edit-article-page-cy"]').should('exist');
  });
});
