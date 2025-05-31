/* eslint-disable max-nested-callbacks */
describe('User Listing Page', () => {
  beforeEach(() => {
    cy.fixture('userListingFallback.json').then((mockData) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'Me') {
          req.reply({ data: { me: { id: 'mock-user-id' } } });
        } else if (req.body.operationName === 'GetPostsByUserId') {
          req.reply(mockData);
        }
      });
    });

    cy.visit('/user-listing');
    cy.contains('Миний зарууд', { timeout: 10000 }).should('exist');
  });

  it('renders header and all tabs', () => {
    const tabs = ['Зарууд', 'Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];
    tabs.forEach((tab) => {
      cy.contains('button', tab, { timeout: 10000 }).should('exist');
    });
  });

  it('shows all listings under "Зарууд" tab', () => {
    cy.contains('Зарууд').click({ force: true });
    cy.get('table tbody tr', { timeout: 10000 }).should('have.length', 3);
  });

  const statusTabs = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];

  statusTabs.forEach((label) => {
    it(`filters listings by "${label}"`, () => {
      cy.contains('button', label).click({ force: true });

      if (label === 'Хүлээгдэж буй') {
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length', 2);
        cy.get('table tbody tr').each(($row) => {
          cy.wrap($row).contains('Хүлээгдэж буй');
        });
      } else if (label === 'Зарагдаж байгаа') {
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length', 1);
        cy.get('table tbody tr').first().contains('Зарагдаж байгаа');
      } else {
        cy.get('table tbody tr', { timeout: 10000 }).should('have.length', 0);
      }
    });
  });

  it('displays 3 action icons in every row', () => {
    cy.contains('Зарууд').click({ force: true });
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('svg').should('have.length.at.least', 3);
    });
  });

  it('table head has right column borders except last column', () => {
    cy.get('table thead tr th').each(($th, index, $list) => {
      if (index < $list.length - 1) {
        cy.wrap($th)
          .invoke('attr', 'class')
          .should('match', /border-r/);
      } else {
        cy.wrap($th)
          .invoke('attr', 'class')
          .should('not.match', /border-r/);
      }
    });
  });

  it('renders fallback image and price correctly for no image and no price', () => {
    cy.contains('Зарууд').click({ force: true });

    cy.get('table tbody tr')
      .eq(0)
      .within(() => {
        cy.get('img').should('have.attr', 'src').and('include', 'url=%2Fplaceholder.png');

        cy.contains('Тодорхойгүй').should('exist');
      });
  });

  it('renders unknown status as fallback translated status', () => {
    cy.contains('Зарууд').click({ force: true });
    cy.get('table tbody tr')
      .eq(1)
      .within(() => {
        cy.contains('Хүлээгдэж буй').should('exist');
        cy.contains('1,000,000₮').should('exist');
      });
  });
});
