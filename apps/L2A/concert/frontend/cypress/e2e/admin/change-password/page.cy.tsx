describe('Change Password Page', () => {
  beforeEach(() => {
    cy.visit('/admin/change-password');

    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
  });

  it('should validate empty fields and disable submit button', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should show error when passwords do not match', () => {
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг давтах"]').type('differentPassword');

    cy.contains('Нууц үг таарахгүй байна').should('exist');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should submit the form successfully when passwords match', () => {
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг давтах"]').type('password123');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button[type="submit"]').click();

    cy.get('@alertStub').should('have.been.calledWith', 'Нууц үг амжилттай шинэчлэгдлээ.');
    cy.location('pathname').should('eq', '/auth/signin');
  });
});
