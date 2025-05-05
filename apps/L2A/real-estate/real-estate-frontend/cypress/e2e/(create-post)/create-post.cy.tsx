describe('CreatePostCard form', () => {
  beforeEach(() => {
    cy.visit('/create-post');
  });

  it('shows validation error when field is empty', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Талбайн утгыг заавал оруулна уу').should('exist');
  });

  it('shows validation error for too small value', () => {
    cy.get('[data-testid="field"]').clear().type('5');
    cy.get('button[type="submit"]').click();
    cy.contains('Талбайн утга 2-оос дээш байх ёстой').should('exist');
  });

  it('submits the form with valid data', () => {
    const stub = cy.stub(console, 'log');
    cy.get('[data-testid="field"]').clear().type('50');
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        expect(stub).to.have.been.calledWithMatch({
          field: 50,
        });
      });
  });
});
