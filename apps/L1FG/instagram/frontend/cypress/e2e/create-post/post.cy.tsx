describe('PostCreate', () => {
  it(`Should `, () => {
    cy.visit('/home');
    cy.get('[data-cy=create-post-button]').click();
    cy.get('[data-cy=create-post-image]').type('zuragnii link bolku bn');
    cy.get('[data-cy=create-post-caption]').type('test cypress');
    cy.get('[data-cy=create-post-userID]').type('6780dbbca021c1aade886735');
    cy.get('[data-cy=create-post-submit]').click();
  });
});
