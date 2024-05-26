describe('Handle section page', () => {
  beforeEach(() => cy.visit('/section'));

  it('1.Should display AddSection feature', () => {
    cy.visit('/6633305c94d4584898bb049a');
    cy.get('[data-cy="lesson-test-id"]').should('exist').eq(0).click();
    cy.window().its('localStorage').invoke('getItem', 'lessonID');
    cy.url().should('include', '/section');
    cy.get('[data-testid="add-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist').type('html');
    cy.get('[data-cy="description"]').should('exist').type('html intro');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').eq(0).click();
  });
  it('2.When section created successfully AddSection form reset', () => {
    cy.get('[data-testid="add-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist');
    cy.get('[data-cy="description"]').should('exist');
    cy.get('#file-test').selectFile('public/js.png', { force: true });
    cy.get('[data-cy="add-section-handle-btn"]').should('exist').should('be.disabled');
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateSectionMutation') {
        req.reply((res) => {
          expect(res.body.variables.sectionInput.title).to.equal('Test Title');
          expect(res.body.variables.sectionInput.description).to.equal('Test Description');
          expect(res.body.variables.sectionInput.contentImage).to.equal('test-image.jpg');
          expect(res.body.variables.sectionInput.posted).to.equal(true);
          res.send({ data: { createSection: { id: 'some-id' } } });
        });
      }
    }).as('createSectionMutation');
  });

  it('3.Should display GetSections component', () => {
    cy.visit('/6633305c94d4584898bb049a');
    cy.get('[data-cy="lesson-test-id"]').should('exist').eq(0).click();
    cy.window().its('localStorage').invoke('getItem', 'lessonID');
    cy.url().should('include', '/section');
    cy.get('[data-testid="get-sections-container"]').should('exist');
    cy.get('[data-testid="get-section-form"]').should('exist');
    cy.get('[data-cy="title"]').should('exist');
    cy.get('[data-cy="description"]').should('exist');
    cy.get('[data-cy="contentImage"]').should('exist');
    cy.get('[data-cy="update-btn"]').should('exist').eq(0).click();
    cy.url().should('include', '/update-section');
    cy.visit('/section');
  });

  it('4. check back to dashboard page button click ', () => {
    cy.get('[data-cy="handle-back-page"]').should('exist');
    cy.get('[data-cy="handle-back-page"]').click();
    cy.url().should('include', '/dashboard');
  });
  describe('Should delete section', () => {
    it('5. Should delete section', () => {
      cy.visit('/6633305c94d4584898bb049a');
      cy.get('[data-cy="lesson-test-id"]').should('exist').eq(0).click();
      cy.window().its('localStorage').invoke('getItem', 'lessonID');
      cy.url().should('include', '/section');
      cy.get('[cy-data="delete-button-cy-test"]').should('exist').eq(-1).click();
    });
  });
});
