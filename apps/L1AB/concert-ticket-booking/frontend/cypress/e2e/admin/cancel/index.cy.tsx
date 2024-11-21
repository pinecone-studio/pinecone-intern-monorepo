describe('Cancel Page', () => {
  beforeEach(() => {
    // Cancel хуудсыг ачаалах
    cy.visit('/admin/cancel');
  });

  it('Should render the Container component', () => {
    // Контейнер харагдаж байгаа эсэхийг шалгах
    cy.get('[data-cy="Container"]').should('be.visible');
  });

  it('Should render the CancelComponent inside the Container', () => {
    // Контейнер дотор CancelComponent харагдаж байгаа эсэхийг шалгах
    cy.get('[data-cy="Container"]').within(() => {
      cy.get('[data-cy="Cancel-Component"]').should('be.visible');
    });
  });
});
