describe('User Profile Container', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the user profile page by default', () => {
    cy.get('[data-cy="profile-header"]', { timeout: 10000 }).should('contain', 'Захиалагчийн мэдээлэл');
    cy.get('[data-cy="tab-profile"]', { timeout: 10000 }).should('have.class', 'bg-[#2c2c2e]');
  });

  it('should switch to the orders tab when clicked', () => {
    cy.get('[data-cy="tab-orders"]', { timeout: 10000 }).click();
    cy.get('[data-cy="order-title"]', { timeout: 10000 }).should('contain', 'Захиалгын дугаар');
  });

  it('should allow changing the phone number and email', () => {
    cy.get('[data-cy="input-phone"]', { timeout: 10000 }).clear().type('9900-1234');
    cy.get('[data-cy="input-email"]', { timeout: 10000 }).clear().type('newemail@example.com');
    const spy = cy.spy(window.console, 'log');
    cy.get('[data-cy="save-profile"]', { timeout: 10000 }).click();
    cy.wrap(spy).should('have.been.calledWith', 'Phone:', '9900-1234');
    cy.wrap(spy).should('have.been.calledWith', 'Email:', 'newemail@example.com');
  });

  it('should show password change functionality', () => {
    cy.get('[data-cy="current-password"]', { timeout: 10000 }).click();
    cy.get('[data-cy="new-password"]', { timeout: 10000 }).type('newPassword123');
    cy.get('[data-cy="confirm-password"]', { timeout: 10000 }).type('newPassword123');
    cy.get('[data-cy="save-password"]', { timeout: 10000 }).click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Нууц үг амжилттай шинэчлэгдлээ!');
    });
  });

  it('should not allow mismatched passwords', () => {
    cy.get('[data-cy="current-password"]', { timeout: 10000 }).click();
    cy.get('[data-cy="new-password"]', { timeout: 10000 }).type('newPassword123');
    cy.get('[data-cy="confirm-password"]', { timeout: 10000 }).type('wrongPassword123');
    cy.get('[data-cy="save-password"]', { timeout: 10000 }).click();
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.contains('Шинэ нууц үг таарахгүй байна!');
    });
  });
});
