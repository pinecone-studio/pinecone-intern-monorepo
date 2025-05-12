describe('User Listing Page', () => {
  beforeEach(() => {
    cy.visit('/user-listing');
  });

  it('renders the correct header and tabs', () => {
    cy.contains('Миний зарууд').should('be.visible');
    cy.contains('Зарууд').should('exist');
    cy.contains('Хүлээгдэж буй').should('exist');
    cy.contains('Зарагдаж байгаа').should('exist');
    cy.contains('Буцаагдсан').should('exist');
    cy.contains('Хадгалсан').should('exist');
  });

  it('displays all listings when "Зарууд" tab is active', () => {
    cy.get('table tbody tr').should('have.length', 8);
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

  it('shows action icons for each row', () => {
    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('svg').should('have.length', 3);
      });
  });

  it('displays vertical borders between columns', () => {
    cy.get('table thead tr th').each(($th) => {
      cy.wrap($th).should('have.class', 'border-r');
    });
  });
});
