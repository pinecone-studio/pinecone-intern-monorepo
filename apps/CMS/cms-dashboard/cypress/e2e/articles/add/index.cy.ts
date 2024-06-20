/// <reference types="cypress" />

describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/articles/add');
  });

  it('Should render the ImageInput component', () => {
    cy.contains('label', 'Өнгөц зураг').should('exist');
    cy.get('[data-cy="image-input"]').should('exist');
    cy.contains('p', 'Зураг оруулах').should('exist');
    cy.contains('p', 'Хэмжээ: 928x427').should('exist');
  });
});

