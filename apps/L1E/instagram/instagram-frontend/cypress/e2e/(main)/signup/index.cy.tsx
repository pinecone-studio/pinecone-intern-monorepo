describe("Sign-up Page", () => {
    beforeEach(() => {
        cy.visit('/signup');
    })

    it('1. Should render sign-up', () => {
        cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
    });

    it('2. When user does not enter email, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-Up-Full-Name-Input]').type('Test User');
        cy.get('[data-cy=Sign-Up-Username-Input]').type('testuser123');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('contain.text', 'Email is required')
    })

    it('3. When user enters invalid email, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Email-Input]').type('Naraa')
        cy.get('[data-cy=Sign-Up-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-Up-Full-Name-Input]').type('Test User');
        cy.get('[data-cy=Sign-Up-Username-Input]').type('testuser123');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('contain.text', 'Invalid email address');
    });

    it('4. When user does not enter password, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Submit-Button').click();
        cy.get('[data-cy=Sign-Up-Password-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Password-Input-Error-Message]').should('contain.text', 'Password is required');
    })

    it('5. When user enters less than 6 characters on password input, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Password-Input]').type('Naraa');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Password-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Password-Input-Error-Message]').should('contain.text', 'Password must be at least 6 characters.')
    })

    it('6. When user does not enter full name, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Full-Name-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Full-Name-Input-Error-Message]').should('contain.text', 'Full name is required');
    })

    it('7. When user enters less than 2 characters on full name input, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Full-Name-Input]').type('N');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Full-Name-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Full-Name-Input-Error-Message]').should('contain.text', 'Full name must be at least 2 characters')
    })

    it('8. When user does not enter username, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Username-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Username-Input-Error-Message]').should('contain.text', 'Username is required');
    })

    it('9. When user enters less than 2 characters on username input', () => {
        cy.get('[data-cy=Sign-Up-Username-Input]').type('N');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Username-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Username-Input-Error-Message]').should('contain.text', 'User name must be at least 2 characters.')
    })

    it('10. When the name user enters on username input already exists on database', () => {
        cy.intercept('POST', '**/api/graphql', (req) => {
          if (typeof req.body === 'object' && req.body?.query?.includes('mutation Register')) {
            req.reply({
              statusCode: 200,
              body: { errors: [{ message: 'Username exists' }] },
            });
          }
        });
      
        // Fill ALL required fields so submit runs the mutation
        cy.get('[data-cy=Sign-Up-Email-Input]').type('dup@example.com');
        cy.get('[data-cy=Sign-Up-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-Up-Full-Name-Input]').type('Dup Name');
        cy.get('[data-cy=Sign-Up-Username-Input]').type('Naka');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
      
        cy.get('[data-cy=Sign-Up-Username-Input-Error-Message]')
          .should('be.visible')
          .should('contain.text', 'A user with that username already exists.');
      });

    it('11. When user enters all values, it should navigate to login page', () => {
        cy.intercept('POST', '**/api/graphql', (req) => {
          if (typeof req.body === 'object' && req.body?.query?.includes('mutation Register')) {
            req.reply({
              body: {
                data: {
                  register: {
                    token: 'fake-token',
                    user: { _id: 'u1', email: 'test@example.com' },
                  },
                },
              },
            });
          }
        });
      
        cy.get('[data-cy=Sign-Up-Email-Input]').type('any@example.com');
        cy.get('[data-cy=Sign-Up-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-Up-Full-Name-Input]').type('Any Name');
        cy.get('[data-cy=Sign-Up-Username-Input]').type('anyusername');
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.url().should('include', '/signin');
      });

})