describe('Password Recovery Flow', () => {
  const email = 'my.as.glpzghoo@gmail.com';
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/auth/reset-password');
  });

  it('should change password successfully through all steps', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.get('[data-testid="step-back-to-one"]').click();

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep2: { id: 'id' } } },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.get('[data-testid="step-back-to-two"]').click();

    cy.get('[data-testid="otp-step2-backspace"]').click();
    cy.get('[data-testid="otp-step2-reset"]').click();

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep3: { id: 'id' } } },
    }).as('step3');

    cy.get('input[name="password"]').type(email);
    cy.get('input[name="confirmPassword"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step3');

    cy.contains('Нууц үг амжилттай солигдлоо.');
    cy.url().should('include', '/auth/signin');
  });

  it('should fail on step 2 because of insufficient info', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.get('[data-testid="step-back-to-one"]').click();

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep2: { id: 'id' } } },
    }).as('step2');
    cy.clearLocalStorage();
    cy.get('[data-testid="OTP-input"]').type('123123');
  });

  it('should fail on step 3 because of insufficient info', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.get('[data-testid="step-back-to-one"]').click();

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep2: { id: 'id' } } },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.get('[data-testid="step-back-to-two"]').click();

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep3: { id: 'id' } } },
    }).as('step3');

    cy.clearLocalStorage();

    cy.get('input[name="password"]').type(email);
    cy.get('input[name="confirmPassword"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
  });
});
