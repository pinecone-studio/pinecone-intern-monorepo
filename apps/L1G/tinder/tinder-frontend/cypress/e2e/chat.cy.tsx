describe('Chat Page', () => {
  it('Should render chat page', () => {
    cy.visit('/chat');
    cy.contains('chat page').should('be.visible');
  });
});
