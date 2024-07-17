describe('LoginRole Component', () => {
  it('renders LoginRole component correctly', () => {
    cy.visit('/login-role');

    cy.get('[data-cy=login-role-container]').should('exist');

    cy.get('[data-cy=login-role-container]').find('.flex.flex-col.w-full.h-full.container.mx-auto.items-center.py-8.gap-7').should('exist');

    cy.contains('.header', 'Admin role uptade').should('exist');
  });

  it('checks the layout of the RoleTableFeature', () => {
    cy.visit('/login-role');

    cy.get('.header').should('have.class', 'w-[1154px] bg-[white] rounded-xl h-[72px] flex items-center justify-start p-[20px]');

    cy.get('.flex.flex-col.w-full.h-full.container.mx-auto.items-center.py-8.gap-7').find('.w-[1154px].h-[216px].bg-white.rounded-xl.px-[20px].py-[20px]').should('exist');
  });
});
