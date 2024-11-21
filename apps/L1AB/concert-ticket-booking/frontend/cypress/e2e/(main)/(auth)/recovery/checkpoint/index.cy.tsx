// CheckPoint.cy.ts (Cypress E2E Test)

describe('CheckPoint Component', () => {
  beforeEach(() => {
    // Replace this with the route that renders the CheckPoint component
    cy.visit('/checkpoint'); // Assuming the CheckPoint component is on the /checkpoint route
  });

  it('should render CheckPoint component', () => {
    // Verify the page is visible
    cy.get('[data-cy=OTPInput-Page]').should('be.visible');
  });

  it('should display the CheckCircle icon', () => {
    // Verify the icon is rendered
    cy.get('svg').should('have.class', 'lucide-check-circle'); // Ensure it's the correct icon class
    cy.get('svg').should('have.attr', 'size', '100'); // Verify the size
  });

  it('should display footer text', () => {
    // Assuming the footer text passed is "Success"
    const footerText = 'Success';
    cy.get('[data-cy=OTPInput-Page] p').contains(footerText);
  });
});
