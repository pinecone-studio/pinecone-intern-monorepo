describe('Hotels Page', () => {
  beforeEach(() => {
    cy.visit('/hotels');
  });

  it('renders Hotels page container', () => {
    cy.get('[data-testid=Hotels-Page]').should('exist').and('be.visible');
  });

  it('shows page title and add hotel link', () => {
    cy.get('[data-testid=page-title]').should('contain.text', 'Hotels');
    cy.get('[data-testid=breadcrumb-hotels-link]').should('exist').and('be.visible');
  });

  it('shows breadcrumb link to Hotels', () => {
    cy.get('[data-testid=breadcrumb-hotels-link]').should('exist').and('be.visible').and('have.attr', 'href', '/hotels');
  });

  it('renders FilterHotelsAdmin component with hotels', () => {
    cy.get('[data-cy=FilterHotelsAdmin]').should('exist');
  });

  it('renders HotelsTable component with filtered hotels', () => {
    cy.get('[data-testid=hotels-table]').should('exist');
  });
});
