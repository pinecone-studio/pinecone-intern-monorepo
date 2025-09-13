// describe("Header component", () => {
//     beforeEach(() => {
//       cy.visit('/');
//     });
  
//     it("should render header component successfully", () => {
//       // Logo шалгах
//       cy.get('[data-cy="logo-text"]')
//         .should('exist')
//         .and('have.text', 'TICKET BOOKING');
  
//       // Хайлт input байх ёстой
//       cy.get('[data-cy="search-input"]')
//         .should('exist')
//         .and('have.attr', 'placeholder', 'Хайлт');
  
//       // Бүртгүүлэх товч шалгах
//       cy.get('[data-cy="signup-btn"]')
//         .should('exist')
//         .and('have.text', 'Бүртгүүлэх');
  
//       // Нэвтрэх товч шалгах
//       cy.get('[data-cy="login-btn"]')
//         .should('exist')
//         .and('have.text', 'Нэвтрэх');
  
//       // Сагсны icon шалгах (icon-г class эсвэл `alt` эсвэл `svg`-ээр шалгаж болно)
//       cy.get('svg').should('exist');
//     });
  
//     it("should allow typing in search input", () => {
//       cy.get('[data-cy="search-input"]')
//         .type('Concert')
//         .should('have.value', 'Concert');
//     });
  
//     it("should navigate to signup page when Бүртгүүлэх is clicked", () => {
//       cy.get('[data-cy="signup-btn"]').click();
//       cy.url().should('include', '/signup');
//     });
  
//     it("should navigate to login page when Нэвтрэх is clicked", () => {
//       cy.get('[data-cy="login-btn"]').click();
//       cy.url().should('include', '/login');
//     });
//   });
  