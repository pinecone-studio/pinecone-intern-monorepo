describe('should render signup page', () => {
  it('should render signup page', () => {
    cy.visit('/auth/signup');
    cy.get('[data-cy=signup-form]').should('exist');
    cy.get('[data-cy=signup-form]').contains('Бүртгүүлэх');
    cy.get('[data-cy=signup-form]').contains('Та бүртгэлтэй хаяггүй бол нэвтрэх хэсгээр орно уу.');
  });
});
