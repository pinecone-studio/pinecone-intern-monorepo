describe('Personal Information Page', () => {
  beforeEach(() => {
    cy.visit('/profile');
  });

  it('1. should display personal information form', () => {
    cy.get('[data-cy="Personal-Information-Page"]').should('exist');
    cy.contains('Personal Information').should('exist');
  });

  //   it('2. When user does not enter firstname, it should display error message', () => {
  //     cy.get('[data-cy=Personal-First-Name-Input]')
  //       .focus()
  //       .then(($input) => {
  //         $input.val('');
  //         $input[0].dispatchEvent(new Event('input', { bubbles: true }));
  //       });
  //     cy.get('[data-cy=Personal-Update-Button]').click();
  //     cy.get('[data-cy=Personal-First-Name-Input-Error-Message]').should('be.visible').and('contain', 'First name must be at least 2 characters');
  //   });
  it('1. should display personal information form', () => {
    cy.get('[data-cy="Personal-Information-Page"]').should('exist');
  });

  it('2. When user does not enter firstname, it should display error message', () => {
    cy.get('[data-cy=Personal-First-Name-Input]').clear().should('have.value', '');
    cy.get('[data-cy=Personal-Submit-Button]').click(); // <== анхаараарай, click() гэж бичих ёстой
    cy.get('[data-cy=Personal-First-Name-Input-Error-Message]').should('be.visible').and('contain', 'First name must be at least 2 characters');
  });
});
