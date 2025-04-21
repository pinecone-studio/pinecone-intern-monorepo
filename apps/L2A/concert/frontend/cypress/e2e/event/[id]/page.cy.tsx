describe('event detail page', () => {
  it('eventiin tuhai delgerengui medeelel haragdana', () => {
    cy.visit('/event/12345');
    cy.contains('Special Artist');
    cy.get(`[data-cy="tag-trigger"]`).click();
    cy.get(`[data-cy="tag-option"]`).first().click();
    cy.get(`["submit day"]`).click();
    cy.contains('11 сарын 15');
  });
});
