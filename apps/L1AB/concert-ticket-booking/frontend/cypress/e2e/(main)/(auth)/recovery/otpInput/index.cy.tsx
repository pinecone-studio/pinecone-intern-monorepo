// OTPInput.cy.ts (Cypress E2E Test)
describe('OTPInput Component', () => {
  beforeEach(() => {
    // Replace this with the route that renders the OTPInput component
    cy.visit('/otp-input'); // Assuming the OTPInput component is on the /otp-input route
  });

  it('should render OTPInput component', () => {
    // Verify the page is visible
    cy.get('[data-cy=OTPInput-Page]').should('be.visible');
  });

  it('should display the footer text', () => {
    const footerText = 'Enter the code sent to your email'; // Replace with actual footer text
    cy.get('[data-cy=OTPInput-Page] p').contains(footerText);
  });

  it('should allow user to type OTP in all input slots', () => {
    // Type in each OTP input slot
    cy.get('[data-testid=OTPInput-Slot-0]').type('1');
    cy.get('[data-testid=OTPInput-Slot-1]').type('2');
    cy.get('[data-testid=OTPInput-Slot-2]').type('3');
    cy.get('[data-testid=OTPInput-Slot-3]').type('4');

    // Assert that the values are typed in correctly (you can check the input value)
    cy.get('[data-testid=OTPInput-Slot-0]').should('have.value', '1');
    cy.get('[data-testid=OTPInput-Slot-1]').should('have.value', '2');
    cy.get('[data-testid=OTPInput-Slot-2]').should('have.value', '3');
    cy.get('[data-testid=OTPInput-Slot-3]').should('have.value', '4');
  });

  it('should show the MoveLeft icon', () => {
    // Verify the MoveLeft icon is rendered
    cy.get('svg[data-testid=MoveLeft]').should('be.visible');
  });

  it('should show the RefreshCcw icon', () => {
    // Verify the RefreshCcw icon is rendered
    cy.get('svg[data-testid=RefreshCcw]').should('be.visible');
  });
});
