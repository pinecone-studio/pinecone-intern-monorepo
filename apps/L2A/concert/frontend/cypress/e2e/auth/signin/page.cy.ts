describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/auth/signin');
  });

  it('should render signin form correctly', () => {
    cy.get('[data-cy=signin-form]').should('exist');
    cy.contains('Нэвтрэх');
    cy.contains('Та бүртгэлтэй хаяггүй бол бүртгүүлэх хэсгээр орно уу!');
  });

  it('should validate inputs and disable submit on invalid input', () => {
    cy.get('input[placeholder="name@example.com"]').type('invalidemail');
    cy.get('input[type="password"]').type('123');
    cy.contains('Нэвтрэх').should('be.disabled');
  });

  it('should accept valid inputs', () => {
    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Нэвтрэх').should('not.be.disabled');
  });

  it('should show validation error for invalid email or password', () => {
    cy.get('input[placeholder="name@example.com"]').type('invalidemail');
    cy.get('input[type="password"]').type('123');
    cy.get('.text-red-500').should('exist').and('contain', '');
  });

  it('should show success message on successful login', () => {
    cy.intercept('POST', '/api/graphql', {
      data: {
        loginUser: {
          JWT: 'mocked-jwt-token',
        },
      },
    });

    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Нэвтрэх').click();
    cy.get('.text-green-500').should('contain', 'Амжилттай нэвтэрлээ!');
  });

  it('should show error message on login failure', () => {
    cy.intercept('POST', '/api/graphql', {
      statusCode: 200,
      body: {
        errors: [{ message: 'Invalid credentials' }],
      },
    });

    cy.get('input[placeholder="name@example.com"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpass');
    cy.contains('Нэвтрэх').click();
    cy.get('.text-red-500').should('contain', 'Invalid credentials');
  });

  it('should store token and tokenExpiry in localStorage on login', () => {
    const mockToken = 'mocked-jwt-token';

    cy.intercept('POST', '/api/graphql', {
      data: {
        loginUser: {
          JWT: mockToken,
        },
      },
    });

    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Нэвтрэх').click();

    cy.wait(500);

    cy.window().then((window) => {
      expect(window.localStorage.getItem('token')).to.eq(mockToken);
    });
  });

  it('should navigate to signup page when clicking the link', () => {
    cy.contains('бүртгүүлэх').click();
    cy.url().should('include', '/auth/signup');
  });

  it('should call mutation and store JWT on valid login', () => {
    const fakeToken = 'jwt-mock';
    cy.intercept('POST', '/api/graphql', {
      data: {
        loginUser: { JWT: fakeToken },
      },
    }).as('loginMutation');

    cy.get('input[placeholder="name@example.com"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('Нэвтрэх').click();

    cy.wait('@loginMutation');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq(fakeToken);
    });
  });

  it('should auto login if valid token exists in localStorage', () => {
    const now = Date.now();
    const expiry = now + 24 * 60 * 60 * 1000;

    cy.visit('/auth/signin', {
      onBeforeLoad(win) {
        win.localStorage.setItem('token', 'fake-jwt');
        win.localStorage.setItem('tokenExpiry', expiry.toString());
      },
    });

    cy.get('.text-green-500').should('contain', 'Амжилттай нэвтэрлээ!');
  });

  it('should hide alert message after timeout', () => {
    cy.get('input[placeholder="name@example.com"]').type('invalidemail');
    cy.get('input[type="password"]').type('123');
    cy.wait(100);
    cy.get('.text-red-500').should('exist');

    cy.wait(5100);
    cy.get('.text-red-500').should('not.exist');
  });

  it('should remove validation error after fixing input', () => {
    cy.get('input[placeholder="name@example.com"]').type('invalidemail');
    cy.get('input[type="password"]').type('123');
    cy.get('.text-red-500').should('exist');

    cy.get('input[placeholder="name@example.com"]').clear().type('test@example.com');
    cy.get('input[type="password"]').clear().type('password123');
    cy.get('.text-red-500').should('not.exist');
    cy.get('.text-green-500').should('contain', 'Амжилттай нэвтэрлээ!');
  });
});
