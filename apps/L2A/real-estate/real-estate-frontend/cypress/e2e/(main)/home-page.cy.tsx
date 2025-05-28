describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders hero section and redirects with correct search query', () => {
    cy.get('h1').contains("Discover a place you’ll love to live").should('be.visible');
    cy.get('input[placeholder="Хот, дүүрэг, эсвэл газар хайх..."]').type('Зайсан');
    cy.get('button').contains('Хайх').click();

    cy.location('pathname').should('eq', '/listing');
    cy.location('search').should('include', `search=${encodeURIComponent('Зайсан')}`);
  });

  it('renders category carousel', () => {
    cy.get('[data-cy="category-carousel"]').should('exist');
  });

  it('renders explore section', () => {
    cy.get('[data-cy="explore-section"]').should('exist');
  });

  it('renders recent listings section', () => {
    cy.get('[data-cy="recent-listings-section"]').should('exist');
  });
});
