/// <reference types="cypress" />
describe('Index Page', () => {
  beforeEach(() => {
    cy.visit('/articles/add');
  });

  it('Should render TextField and RightField components', () => {
    cy.contains('Гарчиг өгөх').should('exist');
    cy.contains('Нийтлэлээ бичих').should('exist');
    cy.contains('Өнгөц зураг').should('exist');
    cy.get('[data-cy="image-input"]').should('exist');
    cy.contains('Зураг оруулах').should('exist');
    cy.contains('Хэмжээ: 928x427').should('exist');
  });

  it('Should render the ImageInput component', () => {
    cy.contains('label', 'Өнгөц зураг').should('exist');
    cy.get('[data-cy="image-input"]').should('exist');
    cy.contains('p', 'Зураг оруулах').should('exist');
    cy.contains('p', 'Хэмжээ: 928x427').should('exist');
  });

  it('Should submit the form successfully and display success message', () => {
    const testValues = {
      title: 'Mocked Title',
      body: 'Mocked Body Content',
    };
    cy.get('[name="title"]').type(testValues.title);
    cy.get('[name="body"]').type(testValues.body);
    cy.get('[data-cy="save-draft-button"]').click();
    cy.get('[data-cy="publish-button"]').click();
  });
});
