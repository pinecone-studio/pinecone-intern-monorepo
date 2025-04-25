describe('User Profile Tabs', () => {
  beforeEach(() => {
    cy.visit('/userProfile/123');
  });

  it('should render sidebar and default to user profile', () => {
    cy.get('[data-cy="sidebar"]').should('exist');
    cy.get('[data-cy="profile-tab"]').should('exist');
    cy.get('[data-cy="input-phone"]').should('exist');
    cy.get('[data-cy="input-email"]').should('exist');
  });

  it('should allow updating user profile information', () => {
    cy.get('[data-cy="input-phone"]').type('99119911');
    cy.get('[data-cy="input-email"]').type('test@example.com');

    cy.window().then((win) => cy.spy(win, 'alert').as('profileAlert'));

    cy.get('[data-cy="save-profile-button"]').click();

    cy.get('@profileAlert').should('have.been.calledWith', 'Хувийн мэдээлэл хадгалагдлаа.');
  });

  it('should switch to order history and show orders', () => {
    cy.get('[data-cy="order-history"]').click();
    cy.get('[data-cy="orders-tab"]').should('exist');
    cy.get('[data-cy="order-card"]').should('exist');
    cy.get('[data-cy="order-id"]').should('contain.text', '#');
    cy.get('[data-cy="ticket-list"]').within(() => {
      cy.get('[data-cy^="ticket-"]').should('have.length.at.least', 1);
    });
    cy.get('[data-cy="total-price"]').should('contain.text', '₮');
  });

  it('should switch to forget password and validate mismatched passwords', () => {
    cy.get('[data-cy="forget-password"]').click();
    cy.get('[data-cy="password-tab"]').should('exist');

    cy.get('[data-cy="current-password"]').type('oldpass');
    cy.get('[data-cy="new-password"]').type('newpass123');
    cy.get('[data-cy="confirm-password"]').type('differentpass');

    cy.window().then((win) => cy.spy(win, 'alert').as('passwordAlertMismatch'));

    cy.get('[data-cy="save-password"]').click();

    cy.get('@passwordAlertMismatch').should('have.been.calledWith', 'Шинэ нууц үг таарахгүй байна!');
  });

  it('should switch to forget password and validate successful password change', () => {
    cy.get('[data-cy="forget-password"]').click();
    cy.get('[data-cy="password-tab"]').should('exist');

    cy.get('[data-cy="current-password"]').type('oldpass');
    cy.get('[data-cy="new-password"]').type('newpass123');
    cy.get('[data-cy="confirm-password"]').type('newpass123');

    cy.window().then((win) => cy.spy(win, 'alert').as('passwordAlertSuccess'));

    cy.get('[data-cy="save-password"]').click();

    cy.get('@passwordAlertSuccess').should('have.been.calledWith', 'Нууц үг амжилттай шинэчлэгдлээ!');
  });

  it('should switch to order history and show orders', () => {
    cy.visit('/userProfile/123');

    cy.get('[data-cy="user-profile-container"]').should('exist');

    cy.get('[data-cy="order-history"]').click();

    cy.get('[data-cy="orders-tab"]').should('exist');
  });

  it('should switch between all tabs correctly', () => {
    cy.get('[data-cy="user-profile"]').click({ multiple: true });
    cy.get('[data-cy="profile-tab"]').should('exist');
    cy.get('[data-cy="order-history"]').click({ multiple: true });
    cy.get('[data-cy="order-status"]').should('exist');
    cy.get('[data-cy="orders-tab"]').should('exist');
    cy.get('[data-cy="forget-password"]').click({ multiple: true });
    cy.get('[data-cy="password-tab"]').should('exist');
  });

  it('should block invalid characters in phone input', () => {
    cy.get('[data-cy="user-profile"]').click({ multiple: true });
    cy.get('[data-cy="input-phone"]').type('hello123');
    cy.get('[data-cy="input-phone"]').should('have.value', '123');
  });
});
