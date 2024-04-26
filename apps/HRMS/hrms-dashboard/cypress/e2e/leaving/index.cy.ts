describe('assessment page', () => {
  beforeEach(() => cy.visit('/leaving'));

  it('Should display welcome message', () => {
    cy.get('[data-cy="open-request"]').contains('Чөлөөний хуудас бөглөх').should('be.visible');
  });
});
