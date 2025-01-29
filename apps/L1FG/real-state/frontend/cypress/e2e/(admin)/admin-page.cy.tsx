describe('AdminOwnerPost Component', () => {
  beforeEach(() => {
    cy.visit('AdminPage');
  });

  it('renders the component correctly', () => {
    cy.get('.container').should('exist');
    cy.contains('Зарууд').should('exist');
    cy.get('input[placeholder="Хайлт"]').should('exist');

    const filters = ['Хүсэлт илгээсэн', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];
    filters.forEach((filter) => {
      cy.contains(filter).should('exist');
    });

    const headers = ['ID', 'Нэр', 'Эзэмшигч', 'Утасны дугаар'];
    headers.forEach((header) => {
      cy.get('th').contains(header).should('exist');
    });
  });

  it('displays the correct data in the table', () => {
    cy.get('tbody tr').should('have.length', 1);

    cy.get('tbody tr').within(() => {
      cy.get('td').eq(0).should('contain', '0001');
      cy.get('td').eq(1).should('contain', 'Seoul royal county хотхон');
      cy.get('td').eq(2).should('contain', 'Н.Мөнхтунгалаг');
      cy.get('td').eq(3).should('contain', '99112233');
    });
  });

  it('filters data based on search input', () => {
    const searchInput = 'input[placeholder="Хайлт"]';
    cy.get(searchInput).type('Seoul');
    cy.get('tbody tr').should('have.length', 1);
    cy.get('tbody tr td').eq(1).should('contain', 'Seoul royal county хотхон');
    cy.get(searchInput).clear();
    cy.get('tbody tr').should('have.length', 1);
  });

  it('handles filter button interactions', () => {
    const filters = ['Хүсэлт илгээсэн', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];
    filters.forEach((filter) => {
      cy.contains(filter).click();
      cy.contains(filter).should('have.class', 'hover:bg-[#F4F4F5]');
    });
  });
});
