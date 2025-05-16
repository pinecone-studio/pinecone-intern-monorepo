describe('Admin Listing Table - Filter by Tab', () => {
  beforeEach(() => {
    cy.visit('/admin');
  });

  it('displays only listings that match the selected tab (Зөвшөөрсөн)', () => {
    cy.contains('Зөвшөөрсөн').click().should('have.class', 'font-semibold');

    cy.get('table tbody tr').should('have.length.at.least', 1);

    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('td').eq(2).should('not.be.empty');
      cy.wrap($row).find('td').eq(3).should('match', /\d{8}/);
    });
  });

  it('shows empty message when no listings match tab', () => {
    cy.contains('Админ хассан').click();
    cy.contains('Энэ төлөвт зар алга.').should('exist');
  });

  it('clicking row navigates to detail page and shows detail content', () => {
    cy.contains('Хүлээгдэж буй').click();

    cy.get('table tbody tr').first().click();

    cy.url().should('include', '/admin/details/');
    cy.contains('Ерөнхий мэдээлэл').should('exist');
    cy.contains('Төлөв').should('exist');
  });
});
