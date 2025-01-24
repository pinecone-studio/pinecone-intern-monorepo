describe('HomePage Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the header, carousel, and footer', () => {
    cy.get('header').should('exist');
    cy.get('[data-testid="carousel"]').should('exist');
    cy.get('footer').should('exist');
  });

  it('renders all cards correctly', () => {
    cy.get('[data-testid="card"]').should('have.length', 3);
    cy.get('[data-testid="card"]').first().should('contain.text', 'MUSIC of the SPHERES');
  });

  it('ensures links in header and footer work', () => {
    cy.get('header').within(() => {
      cy.contains('Бүртгүүлэх').click();
    });
    cy.url().should('include', '/sign-up');

    cy.go('back');

    cy.get('footer').within(() => {
      cy.contains('Terms').click();
    });
    cy.url().should('include', '/terms');
  });

  it('tests carousel functionality', () => {
    cy.get('[data-testid="carousel"]').within(() => {
      cy.contains('Next').click();
    });

    cy.get('[data-testid="carousel"]').should('contain.text', 'HIGHER POWER');
  });
});
