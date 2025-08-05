describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays validation errors when form is empty', () => {
    cy.visit('/login');
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });
    cy.contains('Please enter a valid email').should('be.visible');
  });

  it('submits the form with valid credentials', () => {
    cy.get('input[placeholder="name@example.com"]').first().type('test@example.com');
    cy.get('input[placeholder="name@example.com"]').last().type('password123');
    cy.get('button[type="submit"]').click();
  });
});
