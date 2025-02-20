describe('Post Filtering', () => {
  beforeEach(() => {
    cy.visit('/apps/L1FG/real-state/frontend/adminPage/AdminOwnerPostDa');
  });

  it('filters posts based on phone number and status', () => {
    cy.intercept('GET', '/api/posts', {
      fixture: 'posts.json',
    }).as('getPosts');
    cy.wait('@getPosts');
    cy.get('[data-testid="search-input"]').type('1234567890');
    cy.get('[data-testid="status-filter-approved"]').select('APPROVED');
    cy.get('[data-testid="status-filter-pending"]').select('PENDING');
    cy.get('[data-testid="status-filter-declined"]').select('DECLINED');

    cy.get('[data-testid="post-item"]').each(($post) => {
      cy.wrap($post).find('[data-testid="phone-number"]').invoke('text').should('contain', '1234567890');
      cy.wrap($post).find('[data-testid="status"]').invoke('text').should('contain', 'APPROVED');
    });
  });
});
