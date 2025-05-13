describe('Admin Listing Table - Filter by Tab', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('displays only listings that match the selected tab (Зөвшөөрсөн)', () => {
    cy.contains('Зөвшөөрсөн').should('exist').click().should('have.class', 'font-semibold');

    cy.get('table tbody tr').should('have.length.greaterThan', 0);

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row)
        .find('td')
        .eq(0)
        .invoke('text')
        .should('match', /^\d{4}$/);
    });

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(2).should('not.be.empty');
      cy.wrap($row).find('td').eq(3).should('match', /\d{8}/);
    });
  });

  it('shows empty message when no listings match tab', () => {
    cy.contains('Админ хассан').click();
    cy.contains('Энэ төлөвт зар алга.').should('exist');
  });

  it('clicking row calls onSelect logic (navigation)', () => {
    cy.contains('Хүлээгдэж буй').click();

    cy.get('table tbody tr').first().click();

    cy.contains('Ерөнхий мэдээлэл').should('exist');
    cy.contains('Төлөв').should('exist');
  });
});
