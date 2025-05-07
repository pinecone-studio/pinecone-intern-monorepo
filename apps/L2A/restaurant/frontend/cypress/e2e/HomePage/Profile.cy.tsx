describe('UseProfile Component', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });
  it('renders the header with correct text', () => {
    cy.get('[data-cyid="Хэрэглэгчийн хэсэг"]').should('exist').and('have.text', 'Хэрэглэгчийн хэсэг');
    cy.get('iframe').should('exist');
  });
});
