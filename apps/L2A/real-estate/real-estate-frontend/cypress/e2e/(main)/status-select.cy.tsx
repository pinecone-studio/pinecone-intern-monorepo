describe('StatusSelect Component E2E', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('table tbody tr').first().click();
  });

  it('initially shows the correct selected status', () => {
    cy.get('select').should('have.value', 'Хүлээгдэж буй');
  });

  it('changes status and shows success message', () => {
    cy.get('select').select('Зөвшөөрөх');
    cy.get('select').should('have.value', 'Зөвшөөрөх');

    cy.contains('Төлөв амжилттай солигдлоо').should('be.visible');
    cy.contains('Thank you for your review!').should('be.visible');

    cy.wait(3000);
    cy.contains('Төлөв амжилттай солигдлоо').should('not.exist');
  });

  it('does not show message when same value is selected again', () => {
    cy.get('select').select('Хүлээгдэж буй');
    cy.contains('Төлөв амжилттай солигдлоо').should('not.exist');
  });
});
