describe('CustomInput component', () => {
  beforeEach(() => {
    cy.visit('/articles');
  });

  it('renders with correct props and structure', () => {
    const props = {
      label: 'Таны имэйл эсвэл утасны дугаарНууц үгНууц үг давтах',
      helperText: '',
    };

    cy.get('[data-testid="Custom-Input"]').should('exist');
    cy.get('[data-testid="Custom-Input"]').should('have.css', 'gap', '8px');
    cy.get('[data-testid="Custom-Input"]').children().should('have.length', 6);

    cy.get('[data-testid="label"]').should('exist').and('have.text', props.label.toString());
    cy.get('[data-testid="helperText"]').should('exist').and('have.text', props.helperText.toString()).and('have.css', 'color', 'rgb(223, 31, 41)');
  });
});
