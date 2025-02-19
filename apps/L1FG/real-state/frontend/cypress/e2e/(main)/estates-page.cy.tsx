/* eslint-disable @typescript-eslint/no-unused-expressions */
describe('Real Estate Filter Page', () => {
  beforeEach(() => {
    cy.visit('/estates');
  });
  it('1. should render the estates page', () => {
    cy.get('[data-cy="estates-page"]').should('exist');
  });

  it('2. should allow searching', () => {
    cy.get('[data-cy="estates-page-search-input"]').type('test').should('have.value', 'test');
  });

  it('3. should allow category selection', () => {
    cy.get('[data-cy="estates-page-category-checkbox-1"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-category-checkbox-2"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-category-checkbox-2"]').click();
  });

  it('4. should allow selecting a city', () => {
    cy.get('[data-cy="estates-page-city-dropdown"]').click();
    cy.contains('Улаанбаатар').click();
    cy.contains('Улаанбаатар').click();
    cy.contains('Увс').click();
  });

  it('5. should allow selecting a district', () => {
    cy.get('[data-cy="estates-page-district-dropdown"]').click();
    cy.contains('Хан-Уул').click();
    cy.contains('Хан-Уул').click();
    cy.contains('Баянгол').click();
  });

  it('6. should allow selecting a minimum price', () => {
    cy.get('[data-cy="estates-page-min-price-dropdown"]').click();
    cy.contains('1 сая').click();
    cy.contains('1000000').click();
  });

  it('7. should allow selecting a maximum price', () => {
    cy.get('[data-cy="estates-page-max-price-dropdown"]').click();
    cy.contains('5 сая').click();
    cy.contains('5000000').click();
  });

  it('8. should allow selecting number of rooms', () => {
    cy.get('[data-cy="estates-page-room-checkbox-1"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-room-checkbox-1"]').click();
  });
  it('9. should allow selecting number of toilet rooms', () => {
    cy.get('[data-cy="estates-page-toilet-room-checkbox-1"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-toilet-room-checkbox-1"]').click();
  });

  it('10. should allow selecting garage', () => {
    cy.get('[data-cy="estates-page-garage-checkbox"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-garage-checkbox"]').click();
  });

  it('11. should allow selecting terrace', () => {
    cy.get('[data-cy="estates-page-terrace-checkbox"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-terrace-checkbox"]').click();
  });

  it('12. should allow selecting lift', () => {
    cy.get('[data-cy="estates-page-lift-checkbox"]').click().should('be.checked');
    cy.get('[data-cy="estates-page-lift-checkbox"]').click();
  });
  it('13. should allow selecting lift', () => {
    cy.get('[data-cy="estates-page-clear-search-value"]').click();
  });
});
