describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/auth/signup');
  });

  it('should render signup form correctly', () => {
    cy.contains('Бүртгүүлэх');
    cy.get('input[placeholder="example@gmail.com"]').should('exist');
    cy.get('input[placeholder="******"]').should('have.length', 2);
    cy.contains('Та бүртгэлтэй хаягтай бол').should('exist');
  });

  it('should disable submit button on invalid input', () => {
    cy.get('input[placeholder="example@gmail.com"]').type('invalid-email');
    cy.get('input[placeholder="******"]').first().type('short');
    cy.get('input[placeholder="******"]').last().type('short');
    cy.contains('Бүртгүүлэх').should('be.disabled');
  });

  it('should enable submit button on valid input', () => {
    cy.get('input[placeholder="example@gmail.com"]').type('test@example.com');
    cy.get('input[placeholder="******"]').first().type('password123');
    cy.get('input[placeholder="******"]').last().type('password123');
    cy.contains('Бүртгүүлэх').should('not.be.disabled');
  });

  it('should show success message after successful signup', () => {
    cy.intercept('POST', '/api/graphql', {
      data: {
        addUser: {
          id: '1',
          email: 'test@example.com',
        },
      },
    }).as('signupMutation');

    cy.get('input[placeholder="example@gmail.com"]').type('test@example.com');
    cy.get('input[placeholder="******"]').first().type('password123');
    cy.get('input[placeholder="******"]').last().type('password123');
    cy.contains('Бүртгүүлэх').click();

    cy.wait('@signupMutation');

    cy.contains('Бүртгэл амжилттай!').should('exist');
  });

  it('should clear success message after 5 seconds', () => {
    cy.intercept('POST', '/api/graphql', {
      data: {
        addUser: {
          id: '1',
          email: 'test@example.com',
        },
      },
    });

    cy.get('input[placeholder="example@gmail.com"]').type('test@example.com');
    cy.get('input[placeholder="******"]').first().type('password123');
    cy.get('input[placeholder="******"]').last().type('password123');
    cy.contains('Бүртгүүлэх').click();

    cy.contains('Бүртгэл амжилттай!').should('exist');

    cy.wait(5100);
    cy.contains('Бүртгэл амжилттай!').should('not.exist');
  });

  it('should show error in console on failed signup', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 500,
      body: { errors: [{ message: 'Server error' }] },
    });

    cy.get('input[placeholder="example@gmail.com"]').type('fail@example.com');
    cy.get('input[placeholder="******"]').first().type('password123');
    cy.get('input[placeholder="******"]').last().type('password123');
    cy.contains('Бүртгүүлэх').click();
  });

  it('should navigate to signin page when clicking login link', () => {
    cy.contains('нэвтрэх').click();
    cy.url().should('include', '/auth/signin');
  });
});
