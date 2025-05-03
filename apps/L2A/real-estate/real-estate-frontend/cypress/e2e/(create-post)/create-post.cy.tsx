describe('CreatePostCard form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('should render the form fields', () => {
    cy.get('[data-testid="field"]').should('exist');
    cy.contains('Зар оруулах хүсэлт илгээх').should('exist');
  });

  it('should show error if field is empty and blurred', () => {
    cy.get('[data-testid="field"]').focus().blur();
    cy.contains('Талбайн утгыг заавал оруулна уу').should('exist');
  });

  it('should submit form with valid data', () => {
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');

      cy.get('[data-testid="field"]').type('150');
      cy.contains('Зар оруулах хүсэлт илгээх').click();

      cy.get('@consoleLog').should('have.been.calledWithMatch', 'Form data', {
        field: 150,
      });
    });
  });
});
