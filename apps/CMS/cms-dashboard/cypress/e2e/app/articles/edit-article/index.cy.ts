describe('Edit article page', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });
  it('Cypress test for edit article page', () => {
    // 1. Should visit edit-article/[id]
    cy.get('[data-cy="dashboard-table-cy-id"]', { timeout: 5000 }).should('exist');
    cy.get('[data-cy="article-edit-button-cy-id"]', { timeout: 5000 }).eq(0).should('exist').click({ force: true });

    // 2. Should be visile edit-article page
    cy.get('[data-cy="edit-article-page-cy"]', { timeout: 5000 }).should('exist');

    // 3. Should be visible Input label component
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Гарчиг');
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Нийтлэл');
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Ангилал');
    cy.get('[data-cy="input-label-cy-id"]').should('contain', 'Өнгөц зураг');

    // 4. Should be visible Title input component and shows error message
    cy.get('[data-cy="title-input-cy-id"]').should('exist').clear();
    cy.get('[data-cy="content-input-cy-id"]').should('exist').click({ force: true });
    cy.get('[data-cy="helper-text-cy-id"]').should('contain', 'Нийтлэлийн гарчиг хоосон байж болохгүй');

    // 5. Should disappear Title input component's error message
    cy.get('[data-cy="title-input-cy-id"]').type('porsche ustgaj bolohgui !!! ner solij bolohgui !!!');
    cy.contains('Нийтлэлийн гарчиг хоосон байж болохгүй').should('not.exist');

    // 6. Should be visible Content input component and shows error message
    cy.get('[data-cy="content-input-cy-id"]').should('exist').clear();
    cy.get('[data-cy="category-select-input-select-button-cy-id"]').should('exist').select([0]);
    cy.get('[data-cy="helper-text-cy-id"]').should('contain', 'Нийтлэлийн эх хоосон байж болохгүй');

    // 7. Should disappear Content input component's error message
    cy.get('[data-cy="content-input-cy-id"]').type('this is porsche cypress test content');
    cy.contains('Нийтлэлийн эх хоосон байж болохгүй').should('not.exist');

    // 8. Should change cover photo

    // 9. Should change comment permission on Toggle button for comment
    cy.get('[data-cy="comment-permission-check-box-cy-id"]').should('exist').check();

    // 11. Should display toast message and redirect to /dashboard page when click on "Шинэчлэх" button
    cy.contains('Шинэчлэх').should('exist').click({ force: true });
    cy.contains('Successfully updated', { timeout: 5000 }).should('exist');

    // // 10. Should redirect to /dashboard page when click on "Болих" button
    cy.get('[data-cy="article-edit-button-cy-id"]', { timeout: 5000 }).eq(0).should('exist').click({ force: true });
    cy.contains('Болих').should('exist').click({ force: true });
  });
});
