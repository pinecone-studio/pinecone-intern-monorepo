describe('Sign In Page', () => {
  beforeEach(() => {
    cy.visit('/signin');
  });

  it('should render sign in form', () => {
    cy.contains('Home Vault');
    cy.get('input[placeholder="name@example.com"]').should('exist');
    cy.get('input[placeholder="••••••••"]').should('exist');
    cy.contains('Continue').should('exist');
  });

  it('should show error for empty fields', () => {
    cy.contains('Continue').click();
    cy.get('[data-testid="form-error"]', { timeout: 3000 })
      .should('be.visible')
      .and('contain', 'Please fill in both email and password');
  });

  it('should show error for invalid email format', () => {
    cy.get('input[placeholder="name@example.com"]').type('invalidemail');
    cy.get('input[placeholder="••••••••"]').type('password123');
    cy.contains('Continue').click();
    cy.get('[data-testid="form-error"]', { timeout: 3000 })
      .should('be.visible')
      .and('contain', 'Invalid email format');
  });

  it('should submit form with valid credentials (dummy test)', () => {
    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[placeholder="••••••••"]').type('password123');
    cy.contains('Continue').click();
  });
});



