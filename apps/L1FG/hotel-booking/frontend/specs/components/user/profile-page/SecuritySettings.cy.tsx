describe('Contact Component', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('renders form fields correctly', () => {
    cy.get('label').contains('Phone Number').should('exist');
    cy.get('label').contains('Email Address').should('exist');
    cy.get('label').contains('Relationship').should('exist');
  });

  it('shows validation errors when submitting empty form', () => {
    cy.get('button').contains('Update profile').click();
    cy.contains('Invalid email address').should('exist');
    cy.contains('Please select an option').should('exist');
  });

  it('submits form successfully', () => {
    cy.get("input[name='phoneNumber']").type('+1234567890');
    cy.get("input[name='email']").type('test@example.com');
    cy.get("input[name='name8720214312']").type('+0987654321');
    cy.get("div[role='combobox']").click();
    cy.contains('Parent').click();

    cy.get('button').contains('Update profile').click();
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog');
    });
    cy.get('@consoleLog').should('be.called');
  });
});
