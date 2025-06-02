describe('Edit Page E2E', () => {
  beforeEach(() => {
    cy.visit('/user-listing/edit/123'); 
  });

  it('renders all main sections', () => {
    cy.get('[data-cy="edit-page"]').should('exist');
    cy.get('[data-cy="general-info-section"]').should('exist');
    cy.get('[data-cy="images-section"]').should('exist');
    cy.get('[data-cy="location-section"]').should('exist');
    cy.get('[data-cy="building-info-section"]').should('exist');
    cy.get('[data-cy="preview-section"]').should('exist');
  });

  it('checks image previews are visible and selectable', () => {
    cy.get('[data-cy^="image-card-"]').should('have.length.at.least', 1);
    cy.get('[data-cy="image-card-0"]').click().should('have.class', 'ring-2');
  });

  it('verifies form inputs have correct default values', () => {
    cy.get('[data-cy="input-district"]').should('have.value', 'Хан-Уул');
    cy.get('[data-cy="input-khoroo"]').should('have.value', '1-р хороо');
    cy.get('[data-cy="input-built-year"]').should('have.value', '2012');
    cy.get('[data-cy="input-name"]').should('have.value', 'Seoul royal county хотхон');
    cy.get('[data-cy="input-price"]').should('have.value', '880,000,000');
    cy.get('[data-cy="input-area"]').should('have.value', '200');
  });

  it('verifies select inputs show correct default values visually', () => {
    cy.get('[data-cy="select-type"]').should('contain.text', 'Орон сууц');
    cy.get('[data-cy="select-room"]').should('contain.text', '4 өрөө');
    cy.get('[data-cy="select-restroom"]').should('contain.text', '2 өрөө');
    cy.get('[data-cy="select-parking"]').should('contain.text', 'Байхгүй');
  });

  it('verifies textarea has default description', () => {
    cy.get('[data-cy="textarea-description"]').should('contain.value', 'Seoul Royal County хотхонд тавтай морилно уу');
  });

  it('shows preview card with correct info', () => {
    cy.get('[data-cy="listing-preview-card"]').within(() => {
      cy.contains('Seoul royal county хотхон').should('exist');
      cy.contains('880,000,000₮').should('exist');
      cy.contains('200 м²').should('exist');
      cy.contains('4 өрөө').should('exist');
      cy.contains('2 а.ц.ө').should('exist');
    });
  });

  it('shows preview page action buttons', () => {
    cy.get('[data-cy="submit-post-button"]').should('contain.text', 'Зар оруулах хүсэлт илгээх');
    cy.get('[data-cy="save-post-button"]').should('contain.text', 'Хадгалаад гарах');
    cy.get('[data-cy="delete-post-button"]').should('contain.text', 'Устгах');
  });
});
