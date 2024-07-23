describe('FooterButtons Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('AdminNavigateLinksFeature must be defined', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').should('exist');
  });

  it('should render all NavigateLinks with correct text and href', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').within(() => {
      cy.contains('Нүүр').should('have.attr', 'href', '/articles');
      cy.contains('Контент').should('have.attr', 'href', '/');
      cy.contains('Сэтгэгдэл').should('have.attr', 'href', '/comments');
      cy.contains('Статистик').should('have.attr', 'href', '/statistics');
    });
  });

  it('should render the divider', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"] .divider').should('exist');
  });

  it('should render NavigateLinkWithIcon with correct text and href', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').within(() => {
      cy.contains('Контент нэмэх').should('have.attr', 'href', '/articles/add');
    });
  });

  it('should render the correct icon in NavigateLinkWithIcon', () => {
    cy.get('[data-cy="admin-navigate-links-feature-cy-id"]').within(() => {
      cy.contains('Контент нэмэх').within(() => {
        cy.get('svg').should('exist');
      });
    });
  });
});
