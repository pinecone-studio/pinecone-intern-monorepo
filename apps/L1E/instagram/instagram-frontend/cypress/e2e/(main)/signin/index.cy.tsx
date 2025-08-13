describe('Sign-In Page', () => {
    beforeEach(() => {
        cy.visit('/signin');
    })

    it('1. Should render sign-in', () => {
        cy.get('[data-cy=Sign-In-Page]').should('be.visible');
    });

    it('2. When user does not enter email address, it should display error message', () => {
        cy.get('[data-cy=Sign-In-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('contain.text', 'Email is required')

    })

    it('3. When user enters invalid email, it should display error message', () => {
        cy.get('[data-cy=Sign-In-Email-Input]').type('Naraa');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('contain.text', 'Invalid email address')
    })

    it('4. When user does not enter password, it should display error message', () => {
        cy.get('[data-cy=Sign-In-Email-Input]').type('Naraa@gmail.com');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
        cy.get('[data-cy=Sign-In-Password-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-In-Password-Input-Error-Message]').should('contain.text', "Password is required");
    })

    it('5. When user enters less than 6 characters on password input, it should display error message', () => {
        cy.get('[data-cy=Sign-In-Email-Input]').type('Naraa@gmail.com');
        cy.get('[data-cy=Sign-In-Password-Input]').type('Naraa');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
        cy.get('[data-cy=Sign-In-Password-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-In-Password-Input-Error-Message]').should('contain.text', 'Password must be at least 6 characters.');
    })

    it('6. When user enters unregistered email address, it should display error message', () => {
        cy.get('[data-cy=Sign-In-Email-Input]').type('Naran@gmail.com');
        cy.get('[data-cy=Sign-In-Password-Input]').type('Password1');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-In-Email-Input-Error-Message]').should('contain.text', 'A user with that email does not exist.')
    })

    it('7 When user enters all values, it should navigate to signup page', () => {
        cy.get('[data-cy=Sign-In-Email-Input]').type('Naraa@gmail.com');
        cy.get('[data-cy=Sign-In-Password-Input]').type('Naraa0121');
        cy.get('[data-cy=Sign-In-Submit-Button]').click();
    })
})