/// <reference types="cypress" />
import 'cypress-file-upload';

describe('Form Page', () => {
  beforeEach(() => {
    cy.visit('/articles/add');
  });

  it('should render all required elements', () => {
    cy.contains('Гарчиг өгөх').should('exist');
    cy.contains('Нийтлэлээ бичих').should('exist');
    cy.contains('Өнгөц зураг').should('exist');
    cy.get('[data-cy="image-input"]').should('exist');
    cy.contains('Зураг оруулах').should('exist');
    cy.contains('Хэмжээ: 928x427').should('exist');
  });

  it('should disable the submit button when form inputs are empty', () => {
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('should disable the submit button when only the title is filled', () => {
    const testTitle = 'Mocked Title';
    // eslint-disable-next-line
    cy.wait(1000);
    cy.get('#title').type(testTitle);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('should disable the submit button when only the body is filled', () => {
    const testBody = 'Mocked Body Content';
    cy.get('#body').type(testBody);
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('should disable the submit button when only an image is uploaded', () => {
    cy.get('[data-cy="image-input"]').attachFile('example.jpg');
    cy.get('[data-cy="submit-button"]').should('be.disabled');
  });

  it('should render the category input field and dropdown', () => {
    cy.get('[id="category"]').should('exist');
    cy.get('[id="category"]').focus();
    cy.get('ul').should('exist');
  });

  it('should allow adding a new category', () => {
    const newCategory = 'New Category';
    // eslint-disable-next-line
    cy.wait(1000);
    cy.get('[id="category"]').type(newCategory);
    cy.get('[id="category"]').type('{enter}');
    cy.contains(newCategory).should('exist');
  });

  it('should display categories in the dropdown and allow selection', () => {
    const categoryToSelect = 'Coding';
    cy.get('[id="category"]').focus();
    cy.contains(categoryToSelect).click();
    cy.contains(categoryToSelect).should('exist');
  });

  it('should close the dropdown when clicking outside', () => {
    cy.get('[id="category"]').focus();
    cy.contains('Coding').should('exist');
    cy.get('body').click();
    cy.contains('Coding').should('not.exist');
  });

  it('should submit the form successfully', () => {
    // eslint-disable-next-line
    cy.wait(1000);
    const testTitle = 'Mocked Title';
    const testBody = 'Mocked Body Content';
    const categoryToSelect = 'Coding';
    cy.get('#title').type(testTitle);
    cy.get('#body').type(testBody);
    cy.get('[id="category"]').focus();
    cy.contains(categoryToSelect).click();
    cy.get('[data-cy="image-input"]').attachFile('example.jpg');
    cy.get('[data-cy="submit-button"]').click();
  });
});
