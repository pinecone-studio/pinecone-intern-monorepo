describe('MenuCard Component', () => {
  beforeEach(() => {
    cy.visit('/admin/menu'); 
  });

  it('should render the menu card with category buttons', () => {
    cy.get('[data-cy="home-page"]').should('exist');
    cy.get('[data-cy="category-buttons"]').should('have.length.at.least', 1);
  });

  it('should change category when clicked and show respective foods', () => {
    cy.get('[data-cy="category-buttons"]').as('categoryButtons');

    cy.get('@categoryButtons').eq(1).click();
    cy.get('[data-cy="foodsdiv"]')
      .children()
      .should('have.length.at.least', 1);
  });

  it('should highlight selected category button', () => {
    cy.get('[data-cy="category-buttons"]').as('categoryButtons');

    cy.get('@categoryButtons').eq(2).click()
      .should('have.class', 'bg-[#F4F4F5]'); 
  });

  it('should show food cards for the default selected category', () => {
    cy.get('[data-cy="foodsdiv"]')
      .children()
      .should('have.length.at.least', 1);
  });

  it('should display the add product button', () => {
    cy.contains('button', 'Бүтээгдэхүүн')
      .should('be.visible')
      .and('contain', 'Бүтээгдэхүүн');
  });
});
