describe('Comments Dialog Form Container', () => {
  beforeEach(() => {
    cy.visit('/comments');
  });

  it('1.Should have correct three button ', () => {
    cy.get('[data-testid="comments-navbar-form-container"]').should('exist');
    cy.get('[data-testid="comments-navbar-form-container"]').find('[data-cy="All-Button"]').should('exist');
    cy.get('[data-testid="comments-navbar-form-container"]').find('[data-cy="Hidden-Button"]').should('exist');
    cy.get('[data-testid="comments-navbar-form-container"]').find('[data-cy="Deleted-Button"]').should('exist');
  });
  it('2.Should have correct content and functionality', () => {
    cy.get('[data-testid="comments-dialog-form-container"]').should('exist');
    cy.get('[data-testid="comments-dialog-form-container"]').find('[data-cy="Hidden-Button"]').should('exist');
    cy.get('[data-testid="comments-dialog-form-container"]').find('[data-cy="Deleted-Button"]').should('exist');
    cy.get('[data-testid="comments-dialog-form-container"]').find('[data-cy="Reply-Button"]').should('exist');
  });
  it('3. .Should have correct article compontent input test', () => {
    cy.get('[data-testid="comments-input-form-container"]').should('exist').should('be.visible');
  });
  it('3.Should have correct article compontent input test', () => {
    cy.get('[data-cy="Email-Input"]').should('');
    cy.get('[data-cy="Name-Input"]').should('be.visible');
    cy.get('[data-cy="Description-Input"]').should('exist');
  });
});
