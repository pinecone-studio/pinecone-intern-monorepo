describe('AdminSideBar Component', () => {
  beforeEach(() => {
    cy.visit('/hotels');
  });

  it('renders sidebar with admin info and buttons', () => {
    cy.contains('Pedia').should('exist');
    cy.contains('Hotels').should('exist');
    cy.contains('Guests').should('exist');
    cy.contains('admin@pedia.com').should('exist');
  });

  it('highlights selected page and navigates when button is clicked', () => {
    cy.contains('Hotels').click().should('have.class', 'bg-[#F4F4F5]'); // class applied when selected

    cy.url().should('include', '/hotels');

    cy.contains('Guests').click().should('have.class', 'bg-[#F4F4F5]');

    cy.url().should('include', '/guests');
  });
});
