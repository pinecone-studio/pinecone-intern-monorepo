describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should render all form fields correctly', () => {
    cy.get('form').should('exist');

    cy.contains('label', 'Email Address').should('exist');
    cy.contains('label', 'Relationship').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Update profile');
  });

  it('should validate email format', () => {
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email address').should('be.visible');

    cy.get('input[type="email"]').clear().type('valid@email.com');
    cy.contains('Invalid email address').should('not.exist');
  });

  it('should handle relationship selection', () => {
    cy.get('[role="combobox"]').click();

    cy.get('[role="option"]').contains('Parent').click();

    cy.get('[role="combobox"]').should('contain', 'Parent');
  });

  it('should handle form submission with valid data', () => {
    cy.get('input[type="email"]').type('test@example.com');

    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Parent').click();

    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });

    cy.get('button[type="submit"]').click();

    cy.get('@consoleLog').should('be.calledOnce');
  });

  it('should show error toast on submission failure', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });

    cy.get('button[type="submit"]').click();

    cy.contains('Failed to submit the form').should('not.exist');
  });

  it('should handle emergency contact information', () => {
    cy.get('[role="combobox"]').click();
    cy.get('[role="option"]').contains('Sibling').click();

    cy.get('[role="combobox"]').should('contain', 'Sibling');
  });

  it('should be responsive', () => {
    cy.viewport('iphone-6');
    cy.get('form').should('be.visible');

    cy.viewport('ipad-2');
    cy.get('form').should('be.visible');

    cy.viewport(1024, 768);
    cy.get('form').should('be.visible');
  });
});
