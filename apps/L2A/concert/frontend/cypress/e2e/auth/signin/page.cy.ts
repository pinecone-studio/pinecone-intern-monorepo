describe('should render signin page', () => {
  it('should render signin page', () => {
    cy.visit('/auth/signin');
    cy.get('[data-cy=signin-form]').should('exist');
    cy.get('[data-cy=signin-form]').contains('Нэвтрэх');
    cy.get('[data-cy=signin-form]').contains('Та бүртгэлтэй хаяггүй бол бүртгүүлэх хэсгээр');
  });
});
