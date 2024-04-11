describe('CustomInput component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('renders with correct props and structure', () => {
    const props = {
      label: ' Ganuu',
      helperText: 'Error in input',
    };

    cy.get('[data-testid="Custom-Input"]').should('exist');
    cy.get('[data-testid="Custom-Input"]').should('have.css', 'gap', '8px');
    cy.get('[data-testid="Custom-Input"]').children().should('have.length', 1);

    cy.get('[data-testid="label"]').should('exist').and('have.text', props.label.toString());
    cy.get('[data-testid="helperText"]').should('exist').and('have.text', props.helperText.toString()).and('have.css', 'color', '#DF1F29');
  });
});
