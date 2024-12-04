describe('Password Recovery Page', () => {
  beforeEach(() => {
    cy.visit('/recovery'); // Visit the base route
  });

  it('should redirect to step 1 if step query parameter is missing', () => {
    cy.url().should('include', '/recovery?step=1'); // Verify redirection
    cy.contains('OTP хүсэлт илгээх').should('exist'); // Verify step 1 content
    cy.contains('Имэйл хаяг:').should('exist'); // Verify email label
  });

  it('should display step 1 when step=1 is provided', () => {
    cy.visit('/recovery?step=1'); // Visit step 1
    cy.contains('OTP хүсэлт илгээх').should('exist'); // Verify step 1 content
    cy.contains('Имэйл хаяг:').should('exist'); // Verify email label
    cy.get('button').contains('Хүсэлт илгээх').should('exist'); // Verify button
  });

  it('should display step 2 when step=2 is provided', () => {
    cy.visit('/recovery?step=2'); // Visit step 2
    cy.contains('Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу').should('exist'); // Verify step 2 content
    cy.get('[data-testid="OTPInput"]').should('exist'); // Verify OTP input
  });

  it('should display step 3 when step=3 is provided', () => {
    cy.visit('/recovery?step=3'); // Visit step 3
    cy.contains('Нууц үг шинэчлэх').should('exist'); // Verify step 3 content
    cy.contains('Нууц үг оруулах...').should('exist'); // Verify password input label
    cy.contains('Нууц үг давтан оруулах').should('exist'); // Verify confirm password label
  });

  it('should navigate to step 2 after valid email submission in step 1', () => {
    cy.visit('/recovery?step=1'); // Visit step 1
    cy.get('input[type="email"]').type('user@example.com'); // Type email
    cy.get('button').contains('Хүсэлт илгээх').click(); // Submit form
    cy.url().should('include', '/recovery?step=2'); // Verify redirection to step 2
    cy.contains('Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу').should('exist'); // Verify step 2 content
  });

  it('should navigate to step 3 after valid OTP submission in step 2', () => {
    cy.visit('/recovery?step=2'); // Visit step 2
    cy.get('[data-testid="OTPInput"]').type('123456'); // Type OTP
    cy.get('button').contains('Шалгах').click(); // Submit OTP
    cy.url().should('include', '/recovery?step=3'); // Verify redirection to step 3
    cy.contains('Нууц үг шинэчлэх').should('exist'); // Verify step 3 content
  });

  it('should not proceed to step 3 if OTP is invalid', () => {
    cy.visit('/recovery?step=2'); // Visit step 2
    cy.get('[data-testid="OTPInput"]').type('12345'); // Enter invalid OTP
    cy.get('button').contains('Шалгах').click(); // Submit OTP
    cy.url().should('include', '/recovery?step=2'); // Verify URL remains at step 2
    cy.contains('Имэйл хаяг руу илгээсэн 6 оронтой кодыг оруулна уу').should('exist'); // Verify step 2 content
  });

  it('should show error if email is missing on step 1', () => {
    cy.visit('/recovery?step=1'); // Visit step 1
    cy.get('button').contains('Хүсэлт илгээх').click(); // Submit without email
    cy.contains('Имэйл хаяг оруулна уу').should('exist'); // Verify error message
  });
});
