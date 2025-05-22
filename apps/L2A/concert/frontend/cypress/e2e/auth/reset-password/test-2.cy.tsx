describe('asdfa', () => {
  const email = 'my.as.glpzghoo@gmail.com';
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/auth/reset-password');
  });

  it('should throw an error on - step 1', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { errors: [{ message: 'fail' }] },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');
  });

  it('should not trigger if statement - step 1', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: null },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');
  });

  it('should throw an error on - step 2', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { errors: [{ message: 'fail' }] },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');
  });

  it('should not trigger if statement - step 2', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: null },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');
  });

  it('should throw an error on - step 3', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep2: { id: 'id' } } },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.intercept('POST', '**/api/graphql', {
      body: { errors: [{ message: 'fail' }] },
    }).as('step3');

    cy.get('input[name="password"]').type(email);
    cy.get('input[name="confirmPassword"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step3');
  });

  it('should not trigger if statement - step 3', () => {
    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OTP: { id: 'id' } } },
    }).as('step1');

    cy.get('input[name="email"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step1');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: { OtpStep2: { id: 'id' } } },
    }).as('step2');

    cy.get('[data-testid="OTP-input"]').type('123123');
    cy.wait('@step2');

    cy.intercept('POST', '**/api/graphql', {
      body: { data: null },
    }).as('step3');

    cy.get('input[name="password"]').type(email);
    cy.get('input[name="confirmPassword"]').type(email);
    cy.get('button').contains('Үргэлжлүүлэх').click();
    cy.wait('@step3');
  });
});
