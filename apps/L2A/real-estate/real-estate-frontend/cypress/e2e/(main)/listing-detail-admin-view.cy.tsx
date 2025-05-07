describe('ListingDetailAdminView E2E', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('table tbody tr').first().click();
  });

  it('displays correct general information section', () => {
    cy.contains('Ерөнхий мэдээлэл').should('be.visible');
    cy.contains('Н.Мөнхтунгалаг').should('be.visible');
    cy.contains('99112233').should('be.visible');
    cy.contains('Seoul royal county хотхон').should('be.visible');
    cy.contains('880,000,000₮').should('be.visible');
    cy.contains('200.0 м²').should('be.visible');
    cy.contains('4 өрөө').should('be.visible');
    cy.contains('2 өрөө').should('be.visible');
    cy.contains('Байхгүй').should('be.visible');
  });

  it('renders image gallery with 8 images', () => {
    cy.contains('Зураг').should('be.visible');
    cy.get('div[role="img"], img').should('have.length', 8);
  });

  it('displays correct location section', () => {
    cy.contains('Байршил').should('be.visible');
    cy.contains('Хан-Уул').should('be.visible');
    cy.contains('1-р хороо').should('be.visible');
    cy.contains('Зайсан толгойн урд').should('be.visible');
  });

  it('shows building details section', () => {
    cy.contains('Барилгын дэлгэрэнгүй').should('be.visible');
    cy.contains('2012').should('be.visible');
    cy.contains('6').should('be.visible');
    cy.contains('Төмөр вакум').should('have.length', 2);
    cy.contains('4 давхарт').should('be.visible');
    cy.contains('5 давхарт').should('be.visible');
    cy.contains('Ламинат').should('be.visible');
    cy.contains('2 тагттай').should('be.visible');
    cy.contains('Байгаа').should('be.visible');
  });

  it('can change status dropdown', () => {
    cy.get('select').should('have.value', 'Хүлээгдэж буй');
    cy.get('select').select('Зөвшөөрөх');
    cy.get('select').should('have.value', 'Зөвшөөрөх');
  });
});
