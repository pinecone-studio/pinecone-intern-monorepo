describe('Password Recovery Page', () => {
  beforeEach(() => {
    cy.visit('/recovery');
  });

  it('should redirect to step 1 if step query parameter is missing', () => {
    cy.url().should('include', '/recovery?step=1');
    cy.contains('OTP хүсэлт илгээх').should('exist');
    cy.contains('Имэйл хаяг:').should('exist');
  });

  it('should display step 1 when step=1 is provided', () => {
    cy.visit('/recovery?step=1');
    cy.contains('OTP хүсэлт илгээх').should('exist');
    cy.contains('Имэйл хаяг:').should('exist');
    cy.get('button').contains('Хүсэлт илгээх').should('exist');
  });

  it('should display step 2 when step=2 is provided', () => {
    cy.visit('/recovery?step=2');
    cy.contains('Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу').should('exist');
    cy.get('[data-testid="OTPInput"]').should('exist');
  });

  it('should display step 3 when step=3 is provided', () => {
    cy.visit('/recovery?step=3');
    cy.contains('Нууц үг шинэчлэх').should('exist');
    cy.contains('Нууц үг').should('exist');
    cy.contains('Нууц үг давтах').should('exist');
  });
});
