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
  
  it('should enable the submit button when all fields are filled', () => {
    const testTitle = 'Mocked Title';
    const testBody = 'Mocked Body Content';
    cy.wait(1000);
    cy.get('#title').type(testTitle);
    cy.get('#body').type(testBody);
    cy.get('[data-cy="image-input"]').attachFile('example.jpg');
    cy.get('[data-cy="submit-button"]').should('be.enabled');
  });
  
  it('should submit the form successfully', () => {
    const testTitle = 'Mocked Title';
    const testBody = 'Mocked Body Content';
    cy.wait(1000);
    cy.get('#title').type(testTitle);
    cy.get('#body').type(testBody);
    cy.get('[data-cy="image-input"]').attachFile('example.jpg'); 
    cy.get('[data-cy="submit-button"]').click();
  });
  
});
