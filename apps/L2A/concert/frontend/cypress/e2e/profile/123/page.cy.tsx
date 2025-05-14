describe('User Profile Tabs', () => {
  const pass = 'changepass@gmail.com';

  beforeEach(() => {
    cy.visit('/profile/123');
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

  it('should change password successfully', () => {
    cy.intercept('POST', '**/api/graphql').as('waitlogin');
    cy.intercept('POST', '**/api/graphql').as('waitpasschange');
    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type(pass);
    cy.get('input[name="password"]').type(pass);
    cy.get('button[type="submit"]').click();
    cy.wait('@waitlogin');

    cy.visit('/profile/123');

    cy.get('[data-testid="forget-password"]').click();

    cy.get('[data-testid="current-password"]').type(pass);
    cy.get('[data-testid="new-password"]').type(pass);
    cy.get('[data-testid="confirm-password"]').type(pass);
    cy.get('[data-testid="save-password"]').click();

    cy.wait('@waitpasschange');
    cy.contains('Амжилттай солигдлоо!').should('be.visible');
  });

  it('should throw an error on password change', () => {
    cy.get('[data-testid="forget-password"]').click();
    cy.intercept('POST', '**/api/graphql').as('waitapi');

    cy.get('[data-testid="current-password"]').type(pass);
    cy.get('[data-testid="new-password"]').type(pass);
    cy.get('[data-testid="confirm-password"]').type(pass);
    cy.get('[data-testid="save-password"]').click();

    cy.wait('@waitapi');
    cy.contains('Хэрэглэгч олдсонгүй').should('be.visible');
  });

  it('should switch to order history and show orders', () => {
    cy.visit('/profile/123');

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
    cy.get('[data-testid="forget-password"]').click({ multiple: true });
    cy.get('[data-testid="password-tab"]').should('exist');
  });

  it('should block invalid characters in phone input', () => {
    cy.get('[data-cy="user-profile"]').click({ multiple: true });
    cy.get('[data-cy="input-phone"]').type('hello123');
    cy.get('[data-cy="input-phone"]').should('have.value', '123');
  });
});
