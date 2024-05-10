describe('PublishLeftSide', () => {
  beforeEach(() => {
    cy.visit('/articles/create-article');
  });

  it('1. Should render create article page component', () => {
    cy.get('[data-cy="back-button-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="title-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="title-input-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="richText-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="rightside-cy-id"]').should('exist').should('be.visible');
    cy.get('[data-cy="custom-button-cy-id"]').should('exist').should('be.visible');
  });

  it('2. Should handle function back to dashboard', () => {
    cy.get('[data-cy="back-button-cy-id"]').should('exist').click();
    cy.visit('/');
  });

  it('3. Should enter title', () => {
    cy.get('[data-testid="title"]').should('exist').should('be.visible').type('Leap');
  });

  it('4. Should enter content', () => {
    cy.get('[data-cy="title-input-cy-id"]').should('exist').should('be.visible').type('Leap');
    cy.get('[data-testid="quillEditor"]').should('exist').should('be.visible').type('Coding хөтөлбөр');
  });

  it('5. Should select category', () => {
    cy.get('[data-cy="title-input-cy-id"]').should('exist').should('be.visible').type('Leap');
    cy.get('[data-testid="quillEditor"]').should('exist').should('be.visible').type('Coding хөтөлбөр');
    cy.get('[data-cy="selectCategory"]').should('exist').should('be.visible').select(0);
    cy.get('[data-cy="selectCategory"]').should('exist').should('have.value', '');
  });

  it('6.Select an option from the dropdown', () => {
    cy.get('[data-cy="selectCategory"]').select(1);
    cy.get('[data-cy=selectCategory]')
      .invoke('val')
      .then((selectedValue) => {
        return expect(selectedValue).to.exist;
      });
  });

  it('7.Upload image', () => {
    cy.get('[data-cy="rightside-cy-id"]').should('exist').should('be.visible');
    cy.get('#input').selectFile('public/earth.jpeg', { force: true });
  });

  it('8. When user clicks on the createArticle button, it should create new article', () => {
    cy.get('[data-testid="title"]').should('exist').should('be.visible').type('Leap');
    cy.get('[data-testid="quillEditor"]').should('exist').should('be.visible').type('Coding хөтөлбөр');
    cy.get('#input').selectFile('public/earth.jpeg', { force: true });
    cy.get('[data-cy="selectCategory"]').select(1);
    cy.get('[data-cy="custom-button-cy-id"]').should('exist').should('be.visible').click({ multiple: true });
    cy.get('[data-cy="publishButtonArticle"]').should('exist').should('be.visible').click();
    cy.contains('Published Successfully !').should('be.visible');
    cy.get('[data-cy="aritlce-modal-cy-id"]').should('not.exist');
  });
});
