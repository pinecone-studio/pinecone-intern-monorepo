describe('AdminSideBar Feature', () => {
  beforeEach(() => {
    cy.visit('/hotels');
  });

  it('1. renders sidebar with button and admin ', () => {
    cy.contains('Pedia').should('exist');
    cy.contains('Hotels').should('exist');
    cy.contains('Guests').should('exist');
    cy.contains('admin@pedia.com').should('exist');
  });

  it('2. on click change button style and page ', () => {
    cy.contains('Hotels').click().should('have.class', 'bg-[#F4F4F5]');

    cy.url().should('include', '/hotels');

    cy.contains('Guests').click().should('have.class', 'bg-[#F4F4F5]');

    cy.url().should('include', '/guests');
  });

  it('3. navigates and calls handleSelect for Hotels and Guests', () => {
    cy.contains('Hotels').click();
    cy.url().should('include', '/hotels');

    cy.contains('Guests').click();
    cy.url().should('include', '/guests');
  });
});
