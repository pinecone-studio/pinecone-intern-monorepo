/// <reference types="cypress" />
import 'cypress-file-upload';

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

  it('Should handle image upload in the ImageInput component', () => {
    const fileName = 'example.jpg';

    cy.fixture(fileName).then((fileContent) => {
      cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLog');
      });

      cy.get('[data-cy="image-input"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: fileName,
        mimeType: 'image/jpg',
      });

      cy.get('img[alt="uploaded img"]').should('be.visible');

      cy.get('@consoleLog').should('have.been.calledWith', Cypress.sinon.match({ name: fileName }));
    });
  });
});
