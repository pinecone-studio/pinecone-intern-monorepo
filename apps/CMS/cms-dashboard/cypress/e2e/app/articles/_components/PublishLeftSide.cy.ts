describe('PublishLeftSide', () => {
    beforeEach(() => {
      cy.visit('/createArticle');
    });
  
    it('should clicked and have style', () => {
      cy.get('[data-testid="mainBtn"]').should('exist').and('have.css', 'background-color', '#fff').click();
    });
  });
  