describe('OTPInput-Page', () => {
  beforeEach(() => {
    cy.visit('/recovery/otpInput');
  });

  it('should render OTPInput component', () => {
    cy.get('[data-cy=OTPInput-Page]').should('be.visible');
  });

  it('should allow user to type OTP in all input slots', () => {
    cy.get('[data-testid=OTPInput]').type('1');
    cy.get('[data-testid=OTPInput]').type('1');
    cy.get('[data-testid=OTPInput]').type('1');
    cy.get('[data-testid=OTPInput]').type('1');
    cy.get('[data-testid=OTPInput]').type('1');
    cy.get('[data-testid=OTPInput]').type('1');
  });

  it('should show the MoveLeft icon', () => {
    cy.get('svg[data-testid=MoveLeft]').should('be.visible');
  });

  it('should show the RefreshCcw icon', () => {
    cy.get('svg[data-testid=RefreshCcw]').should('be.visible');
  });
});
