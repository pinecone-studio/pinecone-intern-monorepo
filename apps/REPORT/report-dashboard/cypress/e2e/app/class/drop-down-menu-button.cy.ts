describe('DropDownMenuButton', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    cy.viewport(1920, 1080);
  });

  it('shows the more horizontal icon on hover', () => {
    cy.get('[data-testid="class-card"]').first().as('classCard');

    // Ensure the button is initially invisible
    cy.get('@classCard').find('[data-testid="more-horizontal-button"]').should('have.class', 'invisible');

    // Trigger hover and wait for button to become visible
    cy.get('@classCard').trigger('mouseover');
    cy.get('@classCard').find('[data-testid="more-horizontal-button"]').should('have.class', 'group-hover:visible').and('be.visible');
  });

  it('opens the dropdown menu when clicked and contains Edit and Delete options', () => {
    cy.get('[data-testid="class-card"]').first().as('classCard');

    // Force the button to be visible
    cy.get('@classCard').find('[data-testid="more-horizontal-button"]').invoke('removeClass', 'invisible').invoke('addClass', 'visible').click();

    // Check dropdown content
    cy.get('body').within(() => {
      cy.contains('Засах').should('be.visible');
      cy.contains('Устгах').should('be.visible');
    });
  });

  // ... other tests ...
});
