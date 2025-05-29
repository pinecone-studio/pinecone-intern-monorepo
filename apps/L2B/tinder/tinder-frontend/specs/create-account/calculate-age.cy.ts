describe('Calculate Age', () => {
  it('calculates age correctly when birthday has passed', () => {
    cy.visit('/test-calculate-age');

    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);
    birthDate.setMonth(birthDate.getMonth() - 1); // Make sure birthday passed
    const dateStr = birthDate.toISOString().split('T')[0];

    cy.get('[data-cy=birthdate-input]').type(dateStr);
    cy.get('[data-cy=calculate-button]').click();
    cy.get('[data-cy=result]').should('contain', 'Age: 25');
  });

  it('calculates age correctly when birthday is upcoming', () => {
    cy.visit('/test-calculate-age');

    const birthDate = new Date();
    birthDate.setFullYear(birthDate.getFullYear() - 25);
    birthDate.setMonth(birthDate.getMonth() + 1); // Birthday not yet passed
    const dateStr = birthDate.toISOString().split('T')[0];

    cy.get('[data-cy=birthdate-input]').type(dateStr);
    cy.get('[data-cy=calculate-button]').click();
    cy.get('[data-cy=result]').should('contain', 'Age: 24');
  });
});
