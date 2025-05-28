describe('PaymentDone Component', () => {
  beforeEach(() => {
    cy.visit('/payment-done');
  });

  it('displays success animation and message', () => {
    cy.get('svg').should('exist');
    cy.contains('Төлбөр амжилттай төлөгдлөө').should('be.visible');
  });

  it('has a working button link', () => {
    cy.contains('Захиалгын дэлгэрэнгүй харах').should('be.visible').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
