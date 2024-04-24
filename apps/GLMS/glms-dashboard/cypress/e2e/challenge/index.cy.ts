describe('profile page', () => {
    beforeEach(() => cy.visit('/challenge'));
  
    it('Should display welcome message', () => {
      cy.get('h1').contains('Сайн уу');
    });
  });
  