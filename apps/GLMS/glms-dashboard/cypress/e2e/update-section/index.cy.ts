describe('Handle update-section page', () => {
  beforeEach(() => cy.visit('/update-section'));

  it('1. Update section page', () => {
    cy.get('[data-testid="update-section-page-container"]').should('exist');
    cy.get('[data-testid="update-section-page-container"]').should('be.visible');
  });

  it('2. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
    cy.url().should('include', '/section');
  });

  it('3.Should display update section container', () => {
    cy.get('[data-testid="update-section-form"]').should('exist');
    cy.get('[data-cy="update-section-title"]').should('exist').type('html');
    cy.get('[data-cy="update-section-description"]').should('exist').type('html intro');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="update-section-handle-btn"]').eq(1).click();
    cy.url().should('include', '/section');
  });
  it('4. updates form fields with data from API', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetSectionByIdQuery') {
        req.reply((res) => {
          res.send({
            data: {
              getSectionById: {
                id: 'section-id',
                title: 'Mock Title',
                description: 'Mock Description',
                contentImage: 'mock-image.jpg',
              },
            },
          });
        });
      }
    }).as('GetSectionByIdQuery');
  });
});
