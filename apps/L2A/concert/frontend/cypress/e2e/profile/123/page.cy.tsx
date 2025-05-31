describe('User Profile Tabs', () => {
  const pass = 'changepass@gmail.com';
  const phone = '88998899';

  const updateuser = 'changeuserinfo@gmail.com';
  beforeEach(() => {
    cy.visit('/profile/123');
  });

  it('should update user profile info successfully', () => {
    cy.intercept('POST', '**/api/graphql').as('updateUserInfo');
    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type(updateuser);
    cy.get('input[name="password"]').type(updateuser);
    cy.get('button[type="submit"]').click();
    cy.wait('@updateUserInfo');

    cy.get('[data-testid="profile-settings-button"]').click();

    cy.get('[data-testid="user-email"]').clear().type(updateuser);
    cy.get('[data-testid="user-phone"]').clear().type(phone);
    cy.get('[data-testid="save-profile"]').click();

    cy.wait('@updateUserInfo');
    cy.contains('Мэдээлэл амжилттай өөрчлөгдлөө!').should('be.visible');
  });

  it('should show error message if update mutation fails', () => {
    cy.intercept('POST', '**/api/graphql').as('signIn');

    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type(updateuser);
    cy.get('input[name="password"]').type(updateuser);
    cy.get('button[type="submit"]').click();
    cy.wait('@signIn');

    cy.intercept('POST', '**/api/graphql', {
      body: {
        errors: [{ message: 'Internal server error' }],
      },
    }).as('updateError');
    cy.get('[data-testid="profile-settings-button"]').click();

    cy.get('[data-testid="user-email"]').clear().type(updateuser);
    cy.get('[data-testid="user-phone"]').clear().type(phone);
    cy.get('[data-testid="save-profile"]').click();

    cy.wait('@updateError');
  });

  it('should switch to order history and show orders', () => {
    cy.intercept('POST', '**/api/graphql').as('signIn');

    cy.visit('/auth/signin');
    cy.get('input[name="email"]').type('glpzghoo@gmail.com');
    cy.get('input[name="password"]').type('glpzghoo@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.wait('@signIn');

    cy.intercept('POST', '**/api/graphql').as('order');
    cy.get('[data-testid="profile-settings-button"]').click();
    cy.get('[data-cy="order-history"]').click();

    cy.wait('@order');
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
    cy.get('[data-testid="forget-password"]').click({ multiple: true });
    cy.get('[data-testid="password-tab"]').should('exist');
  });
});
