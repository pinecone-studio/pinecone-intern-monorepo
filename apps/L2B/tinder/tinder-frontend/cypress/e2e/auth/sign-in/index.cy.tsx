describe('SignIn Page', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
  });

  it('renders the heading and form fields correctly', () => {
    cy.contains(/sign in/i).should('exist');
    cy.contains(/enter your email below/i).should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.contains(/continue/i).should('exist');
    cy.contains(/create an account/i).should('exist');
  });

  it('shows validation errors when fields are empty', () => {
    cy.contains(/continue/i).click();
    cy.contains(/error in email/i).should('exist');
    cy.contains(/error in password/i).should('exist');
  });

  it('submits the form (UI only)', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains(/continue/i).click();
  });
});
