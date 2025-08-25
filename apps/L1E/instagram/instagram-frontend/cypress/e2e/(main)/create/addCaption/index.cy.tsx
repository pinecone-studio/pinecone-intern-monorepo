describe("Caption Page", () => {
  beforeEach(() => {
    cy.visit("/create");
    cy.contains("Create").click();
    cy.contains("Post").click();
    cy.get('input[data-cy="image-upload"]').first()
      .selectFile("cypress/fixtures/image.webp", { force: true });
    cy.contains("Next").click({ force: true });
  });

    it("1. should type a caption and show word count", () => {
      cy.get('textarea[data-cy="caption-input"]').type("Hello World" ,{force:true});
      cy.contains("2 words").should("be.visible");
    });

  it("2. should go back to preview when clicking back arrow", () => {
   cy.get('[data-cy="back-icon"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click({ force: true });
    cy.contains("Preview").should("be.visible");
  });

  it("3. should share the post successfully", () => {
cy.get('textarea[data-cy="caption-input"]').type("My caption", { force: true });

cy.contains("Share").click({ force: true });

cy.on("window:alert", (txt) => {
expect(txt).to.include("Post created!");
});
  });
});
