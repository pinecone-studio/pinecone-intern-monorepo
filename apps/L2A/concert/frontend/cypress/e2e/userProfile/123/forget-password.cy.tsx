describe('ForgetPassword Component', () => {
  beforeEach(() => {
    cy.visit('/userProfile/123/_features/ForgetPassword');
  });

  it('should render all input fields', () => {
    cy.get('[data-cy="email"]').should('be.visible');
    cy.get('[data-cy="current-password"]').should('be.visible');
    cy.get('[data-cy="new-password"]').should('be.visible');
    cy.get('[data-cy="confirm-password"]').should('be.visible');
    cy.get('[data-cy="save-password"]').should('be.visible');
  });

  it('should show alert if new password and confirm password do not match', () => {
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="current-password"]').type('oldPassword123');
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('wrongPassword');
    cy.get('[data-cy="save-password"]').click();

    cy.get('@alertStub').should('have.been.calledWith', 'Шинэ нууц үг таарахгүй байна!');
  });

  it('should show success alert if API responds with success', () => {
    cy.intercept('POST', '/api/change-password', {
      statusCode: 200,
      body: {},
    }).as('changePassword');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="current-password"]').type('oldPassword123');
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('newPassword123');
    cy.get('[data-cy="save-password"]').click();

    cy.wait('@changePassword');

    cy.get('@alertStub').should('have.been.calledWith', 'Нууц үг амжилттай шинэчлэгдлээ!');
    cy.get('[data-cy="current-password"]').should('have.value', '');
    cy.get('[data-cy="new-password"]').should('have.value', '');
    cy.get('[data-cy="confirm-password"]').should('have.value', '');
  });

  it('should show error alert if API returns error', () => {
    cy.intercept('POST', '/api/change-password', {
      statusCode: 400,
      body: { error: 'Алдаа гарлаа.' },
    }).as('changePassword');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('[data-cy="email"]').type('test@example.com');
    cy.get('[data-cy="current-password"]').type('oldPassword123');
    cy.get('[data-cy="new-password"]').type('newPassword123');
    cy.get('[data-cy="confirm-password"]').type('newPassword123');
    cy.get('[data-cy="save-password"]').click();

    cy.wait('@changePassword');

    cy.get('@alertStub').should('have.been.calledWith', 'Алдаа гарлаа.');
  });
});
