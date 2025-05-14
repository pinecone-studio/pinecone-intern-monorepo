describe('ForgetPassword Component', () => {
  beforeEach(() => {
    cy.visit('/userProfile/{id}/_features/ForgetPassword');
  });

  it('should render the form with email, current password, new password and confirm password fields', () => {
    cy.get('[data-cy="email"]').should('be.visible');
    cy.get('[data-cy="current-password"]').should('be.visible');
    cy.get('[data-cy="new-password"]').should('be.visible');
    cy.get('[data-cy="confirm-password"]').should('be.visible');
  });

  it('should show alert if new password and confirm password do not match', () => {
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('differentPassword');
    cy.get('[data-cy="save-password"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Шинэ нууц үг таарахгүй байна!');
    });
  });

  it('should show success alert if the form is submitted successfully', () => {
    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="current-password"]').type('oldPassword123');
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('newPassword123');
    cy.get('[data-cy="save-password"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Нууц үг амжилттай шинэчлэгдлээ!');
    });
  });

  it('should show error alert if the API returns an error', () => {
    cy.intercept('POST', '/api/change-password', {
      statusCode: 500,
      body: { error: 'Алдаа гарлаа.' },
    }).as('apiRequest');

    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="current-password"]').type('oldPassword123');
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('newPassword123');
    cy.get('[data-cy="save-password"]').click();

    cy.wait('@apiRequest');
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Алдаа гарлаа.');
    });
  });
});
