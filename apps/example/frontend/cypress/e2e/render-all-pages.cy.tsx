import allPages from '../utils/all-pages.json';

const pages = allPages as string[];

describe('render all pages', () => {
  it(`Should render all page`, () => {
    cy.log(JSON.stringify(pages));
    pages.forEach((page) => {
      cy.visit(page);
    });
  });
});
