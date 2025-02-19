describe('Hotel Detail Page', () => {
  beforeEach(() => {
    cy.visit('/hotel-detail/[id]');
  });

  it('should render hotel details', () => {
    cy.visit('/hotel-detail/123'); // 123 ID-тай зочид буудлын дэлгэрэнгүй хуудас руу орно
    cy.get('[data-cy="Hotel-Detail-Page"]').should('exist'); // Хуудас амжилттай ачаалж байгааг шалгана
  });
});
