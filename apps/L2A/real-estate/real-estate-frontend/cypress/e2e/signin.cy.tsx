describe('Sign In Page (Formik)', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('should render form elements', () => {
    cy.get('[data-testid="email-input"]').should('exist');
    cy.get('[data-testid="password-input"]').should('exist');
    cy.contains('Continue').should('exist');
  });

  it('should show errors when fields are empty', () => {
    cy.contains('Continue').click();

    cy.get('[data-testid="email-error"]')
      .should('exist')
      .and('contain', 'Please enter your email');

    cy.get('[data-testid="password-error"]')
      .should('exist')
      .and('contain', 'Please enter your password');
  });

  it('should show error for invalid email format', () => {
    cy.get('[data-testid="email-input"]').type('invalidemail');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.contains('Continue').click();

    cy.get('[data-testid="email-error"]')
      .should('exist')
      .and('contain', 'Invalid email format');
  });

  it('should submit form with valid credentials', () => {
    cy.get('[data-testid="email-input"]').clear().type('test@example.com');
    cy.get('[data-testid="password-input"]').clear().type('password123');
    cy.contains('Continue').click();
  });
});



