describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should render the login page with title, logo, input and button', () => {
    cy.contains('Нэвтрэх').should('be.visible');
    cy.get('img[alt="Pinecone Studio Logo"]').should('be.visible');
    cy.get('input[type="email"]').should('exist');
    cy.get('button[type="submit"]').contains(/нэвтрэх/i).should('exist');
  });

  it('should keep login button disabled for invalid email', () => {
    cy.get('input[type="email"]').type('not-an-email');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should allow login with valid email', () => {
    const email = 'user@example.com';
    cy.get('input[type="email"]').type(email);
    cy.get('button[type="submit"]').click();
    cy.window().then((win) =>
      cy.spy(win.console, 'log').as('consoleLog')
    );
    cy.get('@consoleLog').should('have.been.calledWithMatch', { email });
  });
});


  