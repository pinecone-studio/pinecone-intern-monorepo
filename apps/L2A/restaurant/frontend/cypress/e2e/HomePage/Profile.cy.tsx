describe('UseProfile Component', () => {
  it('should display the user section heading', () => {
    cy.visit('/profile');
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('exist').and('have.text', 'Хэрэглэгчийн хэсэг').and('have.class', 'text-center').and('have.class', 'font-bold');
  });
});
