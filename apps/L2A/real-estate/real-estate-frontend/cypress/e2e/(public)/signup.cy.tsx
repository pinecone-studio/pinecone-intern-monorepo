describe('SignUp Page Flow with OTP via MailSlurp', () => {
  let inboxId: string;
  let emailAddress: string;

  it('should complete signup using real email with OTP', () => {
    cy.createInbox().then((inbox) => {
      inboxId = inbox.id;
      emailAddress = inbox.emailAddress;
      cy.visit('/signup');
      cy.get('[data-cy=email-input]').type(emailAddress);
      cy.get('form').submit();
      cy.waitForLatestEmail(inboxId).then((email) => {
        const otpRegex = /(\d{6})/;
        const otp = email.body?.match(otpRegex)?.[1];
        void expect(otp, 'Extracted OTP from email').to.not.be.undefined;
        cy.log(`Extracted OTP: ${otp}`);

        if (otp) {
          cy.get('[data-cy=otp-input]', { timeout: 15000 })
            .should('exist')
            .and('be.visible');
          cy.get('[data-cy=otp-input]').type(otp);

          cy.get('[data-cy=otp-loading]', { timeout: 10000 }).should('exist');
          cy.get('[data-cy=otp-loading]', { timeout: 10000 }).should('not.exist');

          cy.get('[data-cy=password-input]', { timeout: 10000 }).should('exist');
          cy.get('[data-cy=confirm-password-input]').should('exist');

          cy.get('[data-cy=password-input]').type('StrongPassword123');
          cy.get('[data-cy=confirm-password-input]').type('StrongPassword123');
          cy.get('form').submit();
          cy.url({ timeout: 10000 }).should('not.include', '/signup');
        }
      });
    });
  });
});