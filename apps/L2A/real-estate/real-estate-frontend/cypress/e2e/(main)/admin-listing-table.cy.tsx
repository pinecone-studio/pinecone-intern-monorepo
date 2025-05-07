describe('Admin Listing Table - Filter by Tab', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('displays only listings that match the selected tab (Зөвшөөрсөн)', () => {
    cy.contains('Зөвшөөрсөн').click();

    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('td')
        .eq(0)
        .invoke('text')
        .should('match', /^\d{4}$/);
    });

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(2).should('contain.text', 'Н.Мөнхтунгалаг');
    });

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(3).should('contain.text', '99112233');
    });
  });
});
