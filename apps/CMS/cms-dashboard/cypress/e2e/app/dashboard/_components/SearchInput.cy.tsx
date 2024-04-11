describe('SearchInput', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200');
    });

    it('type in the search input', () => {
      cy.get('input[placeholder="Нийтлэл, шошгоор хайх')
        .type('Example Text')
        .should('value', 'Example Text');
    });
  });