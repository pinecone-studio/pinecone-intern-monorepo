import allPages from '../utils/all-pages.json';

describe('render all pages', () => {
  it(`Should render all page`, () => {
    cy.log(JSON.stringify(allPages));
    for (const page of allPages) {
      it(`Should render ${page}`, () => {
        cy.visit(page);
      });
    }
  });
});
