describe("Sign-up Page", () => {
    beforeEach(() => {
        cy.visit('/sign-up');
    });

    it('1. Should render sign-up', () => {
        cy.get('[data-cy=Sign-Up-Page]').should('be.visible');
    });

    it('2. When user does not enter email, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Submit-Button]').click();
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message').should('be.visible');
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message').should('have.text', 'Email is required')
    })

    it('3. When user enters invalid email, it should display error message', () => {
        cy.get('[data-cy=Sign-Email-Input]').type('Naraa')
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('be.visible');
        cy.get('[data-cy=Sign-Up-Email-Input-Error-Message]').should('have.text', 'Invalid email address');
    });

    it('5. When user enters less than 8 characters on password input, it should display error message', () => {
        cy.get('[data-cy=Sign-Up-Password-Input').type('Naraa');
        cy.get('[data-cy=Sign-Up-Password-Error-Message').should('be.visible');
        cy.get('[data-cy=Sign-Up-Password-Error-Message').should('have.text', '')
    })
})