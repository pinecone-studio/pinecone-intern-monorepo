describe('PublishLeftSide', () => {
  beforeEach(() => {
    cy.visit('/articles/createArticle');
  });

  it('1. Should render PublishLeftSide component', () => {
    cy.get('[data-testid="PublishLeftSide"]').should('exist').should('be.visible');
  });
});

