describe('LoginRole Component', () => {
  it('renders LoginRole component correctly', () => {
    cy.visit('/login-role');

    cy.get('[data-cy=login-role-container]').should('exist');

    cy.get('[data-cy=login-role-container]').find('.flex.flex-col.w-full.h-full.container.mx-auto.items-center.py-8.gap-7').should('exist');

    cy.contains('.header', 'Admin role uptade').should('exist');
  });
});
