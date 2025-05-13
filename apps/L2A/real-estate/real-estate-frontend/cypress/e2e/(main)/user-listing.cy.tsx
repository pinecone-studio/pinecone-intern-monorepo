describe('User Listing Page', () => {
  beforeEach(() => {
    cy.visit('/user-listing');
  });

  it('renders the correct header and all tabs', () => {
    cy.contains('Миний зарууд').should('be.visible');

    ['Зарууд', 'Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'].forEach((tab) => {
      cy.contains('button', tab).should('exist');
    });
  });

  it('displays all listings when "Зарууд" tab is selected', () => {
    cy.contains('Зарууд').click().should('have.class', 'font-semibold');
    cy.get('table tbody tr').should('have.length', 10);
  });

  it('filters listings by "Зарагдаж байгаа"', () => {
    cy.contains('Зарагдаж байгаа').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Зарагдаж байгаа');
    });
  });

  it('filters listings by "Хадгалсан"', () => {
    cy.contains('Хадгалсан').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).contains('Хадгалсан');
    });
  });

  it('shows all 3 action icons per row (Eye, Pencil, Trash)', () => {
    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('svg').should('have.length', 3);
      });
  });

  it('has vertical borders between columns in table head', () => {
    cy.get('table thead tr th').each(($th) => {
      cy.wrap($th).should('have.class', 'border-r');
    });
  });
});
