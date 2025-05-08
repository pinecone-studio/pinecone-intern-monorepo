describe('Featured Event Dialog', () => {
  beforeEach(() => {
    cy.visit('/admin/featured-event');
  });

  it('should open the dialog when Edit Profile button is clicked', () => {
    cy.contains('Edit Profile').click();
    cy.contains('Онцлох тоглолт болгох').should('exist');
  });

  it('should display radio buttons and allow selection', () => {
    cy.contains('Edit Profile').click();

    cy.get('input[type="radio"]').should('have.length', 2);
    cy.get('label').contains('Тийм').click();
    cy.get('input#r1').should('be.checked');

    cy.get('label').contains('Үгүй').click();
    cy.get('input#r2').should('be.checked');
  });

  it('should allow entering a title', () => {
    cy.contains('Edit Profile').click();
    cy.get('input[placeholder="Гарчиг оруулах"]').type('Шинэ тоглолт');
    cy.get('input[placeholder="Гарчиг оруулах"]').should('have.value', 'Шинэ тоглолт');
  });

  it('should show the image upload section', () => {
    cy.contains('Edit Profile').click();
    cy.contains('Зураг оруулах').should('exist');
    cy.get('svg').should('exist');
  });

  it('should handle the save button click', () => {
    cy.contains('Edit Profile').click();
    cy.get('button').contains('Хадгалах').click();
  });
});
