describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the logo', () => {
    cy.get('img[alt=""]').should('be.visible');
    cy.get('img[alt=""]').should('have.attr', 'src', '/Logo.png');
  });

  it('should render the icons', () => {
    cy.get('svg[data-icon="shopping-cart"]').should('be.visible');

    cy.get('svg[data-icon="bell"]').should('be.visible');

    cy.get('svg[data-icon="align-justify"]').should('be.visible');
  });

  it('should have correct layout', () => {
    cy.get('div.flex.justify-between.border-b').should('exist');
  });
});
