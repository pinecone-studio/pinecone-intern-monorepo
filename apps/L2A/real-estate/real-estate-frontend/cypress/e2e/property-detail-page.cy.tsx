describe('Property Detail Page', () => {
  beforeEach(() => {
    cy.visit('/detailed');
  });

  it('should render the main image and 9 thumbnails', () => {
    cy.get('img[alt="Main Property"]').should('be.visible');
    cy.get('img[alt="Thumbnail"]').should('have.length', 9);
  });

  it('should change the main image when a thumbnail is clicked', () => {
    cy.get('img[alt="Thumbnail"]').eq(1).click({ force: true });
    cy.get('img[alt="Main Property"]').should('exist');
  });

  it('should display key info in the info section', () => {
    cy.get('[data-testid="info-section"]').within(() => {
      cy.contains('Эзэмшигч');
      cy.contains('99112233');
      cy.contains('200.0 м²');
      cy.contains('4 өрөө');
    });
  });

  it('should display price and technical details', () => {
    cy.contains('880,000,000₮');
    cy.contains('Ашиглалтад орсон он');
    cy.contains('Лифт');
  });

  it('should render 12 similar listing cards', () => {
    cy.get('[data-cy="listing-Grid"]').find('img').should('have.length', 12);
  });
});
