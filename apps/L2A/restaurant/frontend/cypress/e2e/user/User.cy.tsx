describe('User Page', () => {
    beforeEach(() => {
      cy.visit('/user');
    });
  
    it('renders page title', () => {
      cy.contains('Хэрэглэгчийн хэсэг').should('be.visible');
    });
  
    it('renders AvatarEditor', () => {
      cy.get('[data-testid="user-avatar"]').should('exist');
    });
  
    it('renders all InfoEditor blocks', () => {
      cy.contains('Утас:').should('exist');
      cy.contains('Имэйл хаяг:').should('exist');
      cy.contains('Нууц үг:').should('exist');
      cy.contains('99780680').should('exist');
      cy.contains('mimosa.universe@gmail.com').should('exist');
      cy.contains('***********').should('exist');
    });
  
    it('allows clicking edit icons', () => {
      cy.get('svg').each(($icon) => {
        cy.wrap($icon).click({ force: true });
      });
    });
  });