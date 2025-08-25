    describe("Preview Page", () => {
    beforeEach(() => {
        cy.visit("/create");
        cy.contains("Create").click();
        cy.contains("Post").click();
        cy.get('input[data-cy="image-upload"]').first()
        .selectFile("cypress/fixtures/image.webp", { force: true });
    });

    it("1. should navigate to add caption when clicking Next", () => {
        cy.contains("Next").click({ force: true });
        cy.get('textarea[data-cy="caption-input"]').should("exist");
    });

    it("2. should open discard dialog when clicking back arrow", () => {
       cy.get('[data-cy="back-icon"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click({ force: true });

cy.contains("Discard post?", { timeout: 5000 }).should("be.visible");

    });

      it("3. should cancel discard", () => {
        cy.get('[data-cy="back-icon"]').should('be.visible').and('not.be.disabled').click({ force: true });
        cy.contains("Cancel").click();
        cy.contains("Preview").should("be.visible");
      });

      it("4. should confirm discard and go back to idle", () => {
            cy.get('[data-cy="back-icon"]').should('be.visible').and('not.be.disabled').click({ force: true });
        cy.contains("Discard").click();
        cy.get('input[data-cy="image-upload"]').should("exist");
      });
    });
