// const mockData = [
//     { menu: 'Бүгд', number: 18 },
//     { menu: 'Нийтэлсэн', number: 10 },
//     { menu: 'Ноорог', number: 4 },
//     { menu: 'Архив', number: 2 },
//     { menu: 'Төлөвлөсөн', number: 2 }
// ];
  
// describe('MenuBtn Component', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:4200');
//     cy.visit('/dashboard');
//   });

//   it('renders menu items correctly', () => {
//     mockData.forEach(({ menu }) => {
//       cy.get('[data-testid="cypress-title"]').contains(menu).should('exist');
//     });
//   });

//   it('clicking on menu button changes selected state', () => {
//     cy.get('[data-testid="cypress-title"]').should('not.have.css', 'font-weight', 'bold');

//     cy.get('[data-testid="cypress-title"]').contains('Бүгд').click();

//     cy.get('[data-testid="cypress-title"]').contains('Бүгд').should('have.css', 'font-weight', '700');
//   });
// });

const mockData = [
  { menu: 'Бүгд', number: 18 },
  { menu: 'Нийтэлсэн', number: 10 },
  { menu: 'Ноорог', number: 4 },
  { menu: 'Архив', number: 2 },
  { menu: 'Төлөвлөсөн', number: 2 }
];

describe('MenuBtn Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.visit('/dashboard');
  });

  it('renders menu items correctly', () => {
    mockData.forEach(({ menu }) => {
      cy.get('[data-testid="cypress-title"]').contains(menu).should('exist');
    });
  });

  it('clicking on menu button changes selected state', () => {
    cy.get('[data-testid="menu-btn-test-id"]').should('exist');

    cy.get('[data-testid="menu-btn-test-id"]').click();

    cy.window().its('setSelected').should('have.been.calledWith', 'Test Menu');

    cy.get('[data-testid="cypress-title"]').should('have.css', 'font-weight', 'bold');
  });
});
