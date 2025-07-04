import allPages from '../utils/all-pages.json';

describe('render all pages', () => {
  it('Should render all pages', () => {
    allPages.forEach((page: string) => {
      cy.visit(page);
      cy.get('main').should('exist');
    });
  });
});
