describe('FeaturedEvent Modal', () => {
  beforeEach(() => {
    cy.visit('/admin/featured-event');
    cy.contains('Edit Profile').click();
  });

  it('should render the "Edit Profile" button', () => {
    cy.contains('Edit Profile').should('be.visible');
  });

  it('should open modal with correct title', () => {
    cy.contains('Онцлох тоглолт болгох').should('be.visible');
  });

  it('should have default selected radio option as "Үгүй"', () => {
    cy.get('input[type="radio"][value="comfortable"]').should('be.checked');
  });

  it('should allow selecting "Тийм" radio option', () => {
    cy.get('input[type="radio"][value="default"]').check().should('be.checked');
  });

  it('should allow selecting "Үгүй" radio option', () => {
    cy.get('input[type="radio"][value="comfortable"]').check().should('be.checked');
  });

  it('should display both "Тийм" and "Үгүй" radio labels', () => {
    cy.get('label').contains('Тийм').should('exist');
    cy.get('label').contains('Үгүй').should('exist');
  });

  it('should allow inputting a title', () => {
    cy.get('input[placeholder="Гарчиг оруулах"]').type('Шинэ гарчиг').should('have.value', 'Шинэ гарчиг');
  });

  it('should display image upload section and hidden file input', () => {
    cy.get('label[for="image-upload"]').click();
    cy.get('input[data-cy="file-input"]').should('exist').should('not.be.visible');
  });

  it('should display the "Хадгалах" save button', () => {
    cy.contains('Хадгалах').should('be.visible');
  });

  it('should show validation message on empty title input', () => {
    cy.get('input[placeholder="Гарчиг оруулах"]').clear();
    cy.contains('Хадгалах').click();
    cy.contains('Гарчиг шаардлагатай').should('exist');
  });

  it('should disable save button during submission', () => {
    cy.get('input[placeholder="Гарчиг оруулах"]').type('Test');
    cy.contains('Хадгалах').click();
    cy.contains('Хадгалах').should('be.disabled');
  });

  it('should close modal after successful save', () => {
    cy.get('input[placeholder="Гарчиг оруулах"]').type('Test');
    cy.contains('Хадгалах').click();
    cy.contains('Онцлох тоглолт болгох').should('not.exist');
  });

  it('should close modal when close button is clicked', () => {
    cy.get('button[aria-label="Close"]').click();
    cy.contains('Онцлох тоглолт болгох').should('not.exist');
  });
});
