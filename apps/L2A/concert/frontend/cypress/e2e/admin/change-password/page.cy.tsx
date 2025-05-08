describe('Change Password Page', () => {
  beforeEach(() => {
    cy.visit('/admin/change-password');
  });

  it('should validate empty fields and disable submit button', () => {
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should show error when passwords do not match', () => {
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг давтах"]').type('differentPassword');

    cy.get('button[type="submit"]').should('be.disabled');

    cy.contains('Нууц үг таарахгүй байна').should('exist');
  });

  it('should submit the form successfully when passwords match', () => {
    cy.get('input[placeholder="Нууц үг"]').type('password123');
    cy.get('input[placeholder="Нууц үг давтах"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Нууц үг амжилттай шинэчлэгдлээ.');
    });

    cy.location('pathname').should('eq', '/auth/signin');
  });
});
