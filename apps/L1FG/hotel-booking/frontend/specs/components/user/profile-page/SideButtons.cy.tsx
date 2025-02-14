describe('SideButtons Component', () => {
  beforeEach(() => {
    cy.visit('/settings'); // Adjust the URL based on your routing setup
  });

  it('should display the Personal Information section by default', () => {
    cy.contains('First name').should('be.visible');
    cy.contains('Last name').should('be.visible');
  });

  it('should switch to Contact Info section when clicked', () => {
    cy.contains('Contact Info').click();
    cy.contains('Phone Number').should('be.visible');
    cy.contains('Email Address').should('be.visible');
  });

  it('should switch to Security & Settings section when clicked', () => {
    cy.contains('Security & Settings').click();
    cy.contains('Change Password').should('be.visible');
  });

  it('should highlight the active section button', () => {
    cy.contains('Contact Info').click();
    cy.contains('Contact Info').should('have.class', 'bg-gray-200');
  });
});
