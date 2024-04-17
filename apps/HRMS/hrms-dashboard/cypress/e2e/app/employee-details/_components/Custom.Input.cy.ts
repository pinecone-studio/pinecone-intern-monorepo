describe('Custom input', () => {
  beforeEach(() => cy.visit('localhost:4200/employee-details'));

  it('renders with correct props', () => {
    const props = { label: 'testLabel', type: 'text', placeholder: 'testPlaceholder' };
    cy.get('[data-testid="customInput"]').should('exist');
    cy.get('[data-testid="label"]').should('exist');
  });
});
